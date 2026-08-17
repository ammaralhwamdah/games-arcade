import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const catalog = JSON.parse(readFileSync(join(root, "public", "data", "games.json"), "utf8"));
const lite = catalog.games.map((g) => ({
  slug: g.slug,
  name: g.name,
  category: g.category,
  categories: g.categories,
  image: g.image,
  rating: g.rating,
  plays: g.plays,
  year: g.year,
  tags: g.tags,
}));
writeFileSync(join(root, "public", "data", "games.min.json"), JSON.stringify(lite));
console.log("games.min.json written:", lite.length, "games");
