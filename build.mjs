import { cp, mkdir, rm, access } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public");

async function pathExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyRequired(rel) {
  const from = path.join(ROOT, rel);
  if (!(await pathExists(from))) {
    throw new Error(`Required file or folder missing for build: ${rel}`);
  }
  const to = path.join(OUT_DIR, rel);
  await cp(from, to, { recursive: true, force: true });
}

async function copyOptional(rel) {
  const from = path.join(ROOT, rel);
  if (!(await pathExists(from))) {
    console.warn(`[build] skip (not in repo): ${rel}`);
    return;
  }
  const to = path.join(OUT_DIR, rel);
  await cp(from, to, { recursive: true, force: true });
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const required = ["index.html", "styles.css", "script.js"];
  const optional = [
    "blog.html",
    "post.html",
    "blog.js",
    "blog-data.js",
    "icons",
    "Images",
    "CV",
    "snippets",
  ];

  await Promise.all(required.map((entry) => copyRequired(entry)));
  await Promise.all(optional.map((entry) => copyOptional(entry)));

  console.log(`Built static output -> ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
