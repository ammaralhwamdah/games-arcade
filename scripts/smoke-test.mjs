/**
 * Post-deploy smoke test.
 *
 * Confirms the published site actually serves every catalog game, not just
 * that the build produced files. Catches CDN caching, base-path mistakes and
 * silent partial deploys. Exits non-zero on any failure so the workflow goes
 * red instead of passing quietly.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const arg = process.argv[2];
const BASE = (arg || "https://playkrux.com").replace(/\/$/, "");
const TIMEOUT_MS = 20000;

const catalog = JSON.parse(readFileSync(join(root, "public", "data", "games.json"), "utf8"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// GitHub Pages can take a while to propagate a new deployment, so allow the
// first few probes to fail and retry before declaring the site unhealthy.
const SETTLE_MS = 45000;
const SETTLE_STEP = 5000;

async function get(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "PlayKrux-DeployCheck/1.0", "Cache-Control": "no-cache" },
      signal: ac.signal,
    });
    const body = res.ok ? await res.text() : "";
    return { status: res.status, body };
  } catch (e) {
    return { status: 0, body: "", err: String((e && e.message) || e) };
  } finally {
    clearTimeout(t);
  }
}

async function expectOk(url, mustContain) {
  const deadline = Date.now() + SETTLE_MS;
  let last = null;
  for (;;) {
    last = await get(url);
    if (last.status === 200) {
      if (mustContain && !last.body.includes(mustContain)) {
        return { url, ok: false, why: `200 but missing "${mustContain}"` };
      }
      return { url, ok: true };
    }
    if (Date.now() >= deadline) break;
    await sleep(SETTLE_STEP);
  }
  return {
    url,
    ok: false,
    why: last && last.err ? `error: ${last.err}` : `status ${last && last.status}`,
  };
}

const targets = [
  { url: `${BASE}/`, must: "PlayKrux" },
  { url: `${BASE}/games`, must: "Games" },
  { url: `${BASE}/sitemap.xml`, must: "<urlset" },
];

for (const g of catalog.games) {
  // The clean /play/<slug> URL is what users and Google hit. Next's flat
  // export also exposes /play/<slug>.html; require the clean URL to work.
  targets.push({ url: `${BASE}/play/${g.slug}`, must: g.name });
  targets.push({ url: `${BASE}/${g.file}`, must: "<html" });
}

console.log(`Smoke testing ${targets.length} URLs on ${BASE} ...`);

const results = [];
const CONCURRENCY = 8;
let cursor = 0;
async function worker() {
  while (cursor < targets.length) {
    const t = targets[cursor++];
    results.push(await expectOk(t.url, t.must));
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const failed = results.filter((r) => !r.ok);
for (const f of failed) console.error(`  x ${f.url} -> ${f.why}`);

if (failed.length) {
  console.error(`\nSMOKE TEST FAILED: ${failed.length}/${results.length} URLs are not healthy.\n`);
  process.exit(1);
}
console.log(`Smoke test passed: ${results.length}/${results.length} URLs healthy.`);
