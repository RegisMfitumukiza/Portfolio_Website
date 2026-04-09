import { Resend } from "resend";

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit (works per serverless instance).
// Not perfect, but helps against basic spam bursts.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const ipHits = globalThis.__contact_ip_hits ?? new Map();
globalThis.__contact_ip_hits = ipHits;

function getClientIp(req) {
  const xfwd = req.headers["x-forwarded-for"];
  if (typeof xfwd === "string" && xfwd.length) return xfwd.split(",")[0].trim();
  return "unknown";
}

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip) ?? { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }
  entry.count += 1;
  ipHits.set(ip, entry);
  return entry.count <= RATE_MAX;
}

function badRequest(res, message) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: false, message }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, message: "Method not allowed" }));
    return;
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, message: "Too many requests. Try again soon." }));
    return;
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        message:
          "Server is not configured. Missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM.",
      })
    );
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }

  if (!body || typeof body !== "object") {
    badRequest(res, "Invalid request body.");
    return;
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const hp = String(body.hp ?? "").trim(); // honeypot

  if (hp) {
    // Bots often fill hidden fields. Pretend success to reduce retries.
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (!name || !email || !subject || !message) {
    badRequest(res, "Missing required fields.");
    return;
  }
  if (!EMAIL_RE.test(email)) {
    badRequest(res, "Invalid email address.");
    return;
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Portfolio: ${subject}`,
      text:
        `New portfolio message\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `${message}\n`,
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        message: "Failed to send message. Please try again later.",
      })
    );
  }
}

