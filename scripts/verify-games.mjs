import { readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const catalog = JSON.parse(readFileSync(join(root, "public", "data", "games.json"), "utf8"));
const games = catalog.games;
const base = catalog.cdnBase || null;

const CONCURRENCY = 40;
const TIMEOUT_MS = 15000;

async function checkLocal(file) {
  try {
    const p = join(root, "public", file);
    const st = statSync(p);
    const head = readFileSync(p, "utf8").slice(0, 2048);
    return { status: st.isFile() ? 200 : 404, ct: "text/html", len: st.size, head };
  } catch (e) {
    return { status: 404, ct: "", len: 0, head: "", err: String(e && e.message ? e.message : e) };
  }
}

async function checkRemote(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Range: "bytes=0-2047" },
      signal: ac.signal,
    });
    const ct = res.headers.get("content-type") || "";
    const cr = res.headers.get("content-range") || "";
    const total = Number((cr.match(/\/(\d+)/) || [])[1] || 0);
    const text = await res.text();
    return { status: res.status, ct, len: total, head: text.slice(0, 2048) };
  } catch (e) {
    return { status: 0, ct: "", len: 0, head: "", err: String(e && e.message ? e.message : e) };
  } finally {
    clearTimeout(t);
  }
}

const check = base ? checkRemote : checkLocal;

const results = new Array(games.length);
let cursor = 0;

async function worker() {
  while (cursor < games.length) {
    const i = cursor++;
    const game = games[i];
    const url = base ? `${base}/${game.file}` : game.file;
    results[i] = await check(url);
    if (i % 250 === 0) console.error(`checked ${i}/${games.length}`);
  }
}

const start = Date.now();
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.error(`done in ${((Date.now() - start) / 1000).toFixed(1)}s`);

const bad = [];
const plain = [];
const small = [];
const wrappers = [];
for (let i = 0; i < games.length; i++) {
  const r = results[i];
  const g = games[i];
  const okStatus = r.status === 200 || r.status === 206;
  if (!okStatus) bad.push({ slug: g.slug, file: g.file, ...r });
  else if (!/text\/html/i.test(r.ct)) plain.push({ slug: g.slug, file: g.file, ct: r.ct, len: r.len });
  if (okStatus && r.len > 0 && r.len < 6000) small.push({ slug: g.slug, file: g.file, len: r.len });
  if (okStatus && r.head && /<iframe/i.test(r.head)) {
    const ext = (r.head.match(/src="(https?:\/\/[^"]+)"/i) || [])[1] || "";
    wrappers.push({ slug: g.slug, file: g.file, len: r.len, external: ext });
  }
}

const report = {
  total: games.length,
  checkedInSeconds: ((Date.now() - start) / 1000).toFixed(1),
  ok: games.length - bad.length - plain.length,
  notFoundOrError: bad,
  notHtml: plain,
  smallFiles: small,
  iframeWrappers: wrappers,
};

writeFileSync(join(root, "scripts", "verify-report.json"), JSON.stringify(report, null, 2));
console.log("OK (served as html, reachable):", report.ok);
console.log("Not 200 / errors:", bad.length);
console.log("Not served as text/html:", plain.length);
console.log("Small files (<6KB):", small.length);
console.log("iframe wrappers:", wrappers.length);
