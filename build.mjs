import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public");

async function main() {
  // Clean output folder
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const entriesToCopy = [
    "index.html",
    "styles.css",
    "script.js",
    // keep these even if blog is WIP
    "blog.html",
    "blog.js",
    "post.html",
    "icons",
    "Images",
    "CV",
  ];

  await Promise.all(
    entriesToCopy.map(async (entry) => {
      const from = path.join(ROOT, entry);
      const to = path.join(OUT_DIR, entry);
      await cp(from, to, { recursive: true, force: true });
    })
  );

  console.log(`Built static output -> ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

