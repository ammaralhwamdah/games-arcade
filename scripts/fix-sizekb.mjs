import { readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const p = join(root, "public", "data", "games.json");

const catalog = JSON.parse(readFileSync(p, "utf8"));
let changed = 0;
const rows = [];

for (const g of catalog.games) {
  const size = statSync(join(root, "public", g.file)).size;
  const actual = Math.round(size / 1024);
  if (g.sizeKb !== actual) {
    rows.push(`  ${g.slug.padEnd(22)} ${String(g.sizeKb).padStart(3)} KB -> ${actual} KB  (${size} bytes)`);
    g.sizeKb = actual;
    changed++;
  }
}

if (changed === 0) {
  console.log("sizeKb already accurate for all", catalog.games.length, "games");
} else {
  writeFileSync(p, JSON.stringify(catalog, null, 2) + "\n");
  console.log(`sizeKb corrected for ${changed} game(s):`);
  for (const r of rows) console.log(r);
}
