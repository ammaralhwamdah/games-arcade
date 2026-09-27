import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "out");

const errors = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(out)) {
  console.error("FATAL: out/ does not exist. The build produced no export directory.");
  process.exit(1);
}

// 1. Core pages that must always exist in the static export.
const corePages = [
  "index.html",
  "games.html",
  "blog.html",
  "about.html",
  "privacy.html",
  "terms.html",
  "sitemap.xml",
  "robots.txt",
  "404.html",
];
for (const p of corePages) {
  if (!existsSync(join(out, p))) fail(`missing core page: out/${p}`);
}

// 2. Every catalog game must have BOTH its /play wrapper page and its
//    playable HTML copied into the export. A missing one means the live
//    site would 404 for that game.
//
//    `next build` with output:"export" writes dynamic routes in FLAT form
//    (/play/<slug>.html), not as folders, so accept either layout.
const catalog = JSON.parse(readFileSync(join(root, "public", "data", "games.json"), "utf8"));

for (const g of catalog.games) {
  const flat = join(out, "play", `${g.slug}.html`);
  const nested = join(out, "play", g.slug, "index.html");
  if (!existsSync(flat) && !existsSync(nested)) {
    fail(`missing play page for "${g.slug}": out/play/${g.slug}.html`);
  }

  const gameFile = join(out, g.file);
  if (!existsSync(gameFile)) {
    fail(`missing game file for "${g.slug}": out/${g.file}`);
  } else {
    const size = statSync(gameFile).size;
    if (size < 4000) fail(`game file suspiciously small for "${g.slug}": ${size} bytes`);
  }

  if (g.image && !existsSync(join(out, g.image.replace(/^\//, "")))) {
    fail(`missing image for "${g.slug}": out/${g.image.replace(/^\//, "")}`);
  }
}

// 3. Homepage sanity: the title and the games catalog script must be present,
//    so a blank/placeholder export cannot pass silently.
const home = join(out, "index.html");
if (existsSync(home)) {
  const html = readFileSync(home, "utf8");
  if (!/<title>[^<]+<\/title>/i.test(html)) fail("out/index.html has no <title>");
  if (!html.includes("PlayKrux")) fail("out/index.html does not mention PlayKrux");
}

// 4. games.min.json must be in sync with games.json (client-side catalog).
const minPath = join(out, "data", "games.min.json");
if (existsSync(minPath)) {
  const min = JSON.parse(readFileSync(minPath, "utf8"));
  if (min.length !== catalog.games.length) {
    fail(
      `games.min.json out of sync: has ${min.length}, games.json has ${catalog.games.length}. Run: npm run gen:min`
    );
  }
  const minSlugs = new Set(min.map((g) => g.slug));
  for (const g of catalog.games) {
    if (!minSlugs.has(g.slug)) fail(`games.min.json is missing slug "${g.slug}"`);
  }
} else {
  fail("missing out/data/games.min.json");
}

if (errors.length) {
  console.error(`\nBUILD VERIFICATION FAILED (${errors.length} problem(s)):\n`);
  for (const e of errors) console.error("  x " + e);
  console.error("");
  process.exit(1);
}

console.log(`Build verification passed: ${catalog.games.length} games, ${corePages.length} core pages.`);
