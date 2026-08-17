import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GAME_HOST = "https://html5.gamemonetize.co";
const GM_API = "https://api.gamemonetize.com";

const BLOCK_SCRIPT = `(function(){
var noop=function(){};
try{if(navigator.serviceWorker&&navigator.serviceWorker.register){navigator.serviceWorker.register=function(){return Promise.resolve()}}}catch(e){}
try{
var _open=XMLHttpRequest.prototype.open;
var _send=XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open=function(m,u){try{this.__gmUrl=String(u)}catch(e){}return _open.apply(this,arguments)};
XMLHttpRequest.prototype.send=function(){
try{var u=this.__gmUrl||"";if(u.indexOf("api.gamemonetize.com")!==-1&&u.indexOf(".json")!==-1){
var self=this;var payload=u.indexOf("lock.json")!==-1?JSON.stringify([{domain:"gameverse.pro"},{domain:"gamemonetize.com"},{domain:"gamemonetize.co"},{domain:"html5.gamemonetize.co"}]):JSON.stringify([]);
setTimeout(function(){try{
Object.defineProperty(self,"responseText",{configurable:true,get:function(){return payload}});
Object.defineProperty(self,"response",{configurable:true,get:function(){return payload}});
Object.defineProperty(self,"responseXML",{configurable:true,get:function(){return null}});
self.status=200;self.statusText="OK";self.readyState=4;
if(self.onreadystatechange)self.onreadystatechange();
var ev;try{ev=new Event("load")}catch(e2){ev=document.createEvent("Event");ev.initEvent("load",false,false)}
self.dispatchEvent(ev);if(self.onload)self.onload(ev);
}catch(e3){}},0);return;
}}catch(e){}
return _send.apply(this,arguments)};
}catch(e){}
try{
var _of=window.fetch?window.fetch.bind(window):null;
if(_of){window.fetch=function(i,o){var u=typeof i==="string"?i:(i&&i.url)||"";if(/prebid|doubleclick|gampad|googlesyndication|adnxs|adservice|pagead2|omsdk|omweb|advert|advads|adsystem|adserver/i.test(u)){return Promise.reject(new Error("ad-blocked"))}return _of(i,o)}};
}catch(e){}
try{
var kill=function(s){return /prebid|doubleclick|gampad|googlesyndication|adnxs|adservice|pagead2|omsdk|omweb|advert|advads|adsystem|adserver/i.test(s)};
try{new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var ns=muts[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(!n||n.nodeType!==1)continue;if(n.tagName==="SCRIPT"){var s=n.getAttribute&&(n.getAttribute("src")||"");if(kill(s)){try{n.parentNode&&n.parentNode.removeChild(n)}catch(e){}}}else if(n.tagName==="IFRAME"){var fs=n.getAttribute&&(n.getAttribute("src")||"");if(kill(fs)){try{n.parentNode&&n.parentNode.removeChild(n)}catch(e){}}else{var sub=n.querySelectorAll?n.querySelectorAll("script,iframe"):[];for(var k=0;k<sub.length;k++){var sn=sub[k];var ss=sn.getAttribute&&(sn.getAttribute("src")||"");if(kill(ss)){try{sn.parentNode&&sn.parentNode.removeChild(sn)}catch(e){}}}}}}}).observe(document.documentElement,{childList:true,subtree:true});
}catch(e){}
try{window.setInterval(function(){
try{
if(window.sdk){window.sdk.showBanner=noop;window.sdk.hideBanner=noop;window.sdk.showInterstitial=noop;window.sdk.showRewarded=noop;window.sdk.showRewardedVideo=noop;window.sdk.pauseGame=noop;}
if(window.PokiSDK){
window.PokiSDK.commercialBreak=function(){return Promise.resolve()};
window.PokiSDK.rewardedBreak=function(){return Promise.resolve(false)};
window.PokiSDK.displayAd=noop;
window.PokiSDK.destroyAd=noop;
window.PokiSDK.gameplayStart=noop;
window.PokiSDK.gameplayStop=noop;
window.PokiSDK.customEvent=noop;
}
}catch(e){}
},300);
}catch(e){}
})();`;

const GM_SDK_FALLBACK = `window.sdk=window.sdk||{};
var noop=function(){};
window.sdk.showBanner=noop;
window.sdk.hideBanner=noop;
window.sdk.showInterstitial=noop;
window.sdk.showRewarded=noop;
window.sdk.showRewardedVideo=noop;
window.sdk.isInitialized=function(){return true};
window.sdk.init=function(){return Promise.resolve()};
window.sdk.customEvent=noop;
window.sdk.sdkOptions=window.SDK_OPTIONS||{};
window.SDK_OPTIONS=window.SDK_OPTIONS||{};
var o=window.SDK_OPTIONS.onEvent||function(){};
window.SDK_OPTIONS.onEvent=function(a){try{o(a)}catch(e){}};`;

const SDK_NOOP_APPEND = `;try{
if(window.sdk){
  window.sdk.showBanner=function(){};window.sdk.hideBanner=function(){};
  window.sdk.showInterstitial=function(){};window.sdk.showRewarded=function(){};
  window.sdk.showRewardedVideo=function(){};
}
}catch(e){}`;

const EMPTY_STUB = `/* ad-blocked by gameverse.pro */`;

interface Params {
  params: Promise<{ id: string }>;
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

let cachedSdk: string | null = null;
let sdkLoading: Promise<string> | null = null;

async function fetchRealSdk(): Promise<string> {
  if (cachedSdk) return cachedSdk;
  if (!sdkLoading) {
    sdkLoading = (async () => {
      try {
        const res = await fetch(`${GM_API}/sdk.js`, {
          headers: { "user-agent": UA, accept: "application/javascript" },
          signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) return GM_SDK_FALLBACK;
        const text = await res.text();
        const out = `${text}${SDK_NOOP_APPEND}`;
        cachedSdk = out;
        return out;
      } catch {
        return GM_SDK_FALLBACK;
      }
    })();
  }
  return sdkLoading;
}

function jsResponse(body: string, maxAge = 86400): NextResponse {
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=86400`,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  if (id === "empty.js") {
    return jsResponse(EMPTY_STUB);
  }
  if (id === "sdk.js") {
    return jsResponse(await fetchRealSdk());
  }

  if (!/^[a-z0-9]+$/i.test(id)) {
    return new NextResponse("invalid game id", { status: 400 });
  }

  const origin = `${GAME_HOST}/${id}/`;
  let upstream: Response;
  try {
    upstream = await fetch(origin, {
      headers: { "user-agent": UA, accept: "text/html" },
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
  } catch {
    return new NextResponse("upstream error", { status: 502 });
  }

  if (!upstream.ok) {
    return new NextResponse("game not found", { status: 404 });
  }

  let html = await upstream.text();

  const selfOrigin = new URL(_request.url).origin;

  // Rewrite ad-script URLs to absolute paths on OUR origin so the <base href>
  // injected below (pointing at the upstream host) cannot re-resolve them.
  const sdkAbs = `${selfOrigin}/api/game-proxy/sdk.js`;
  const emptyAbs = `${selfOrigin}/api/game-proxy/empty.js`;
  html = html
    .replace(/https:\/\/api\.gamemonetize\.com\/sdk\.js/g, sdkAbs)
    .replace(/https:\/\/api\.gamemonetize\.com\/sdk_preload\.js/g, emptyAbs)
    .replace(/https:\/\/api\.gamemonetize\.com\/sdk-preload\.js/g, emptyAbs)
    .replace(/["']\/api\/game-proxy\/sdk\.js["']/g, `"${sdkAbs}"`)
    .replace(/["']\/api\/game-proxy\/empty\.js["']/g, `"${emptyAbs}"`)
    .replace(/\/api\/game-proxy\/empty\.js\?v=/g, `${emptyAbs}?v=`);

  const base = `<base href="${origin}">`;
  const injected = `<script>${BLOCK_SCRIPT}</script>`;

  let out: string;
  const headMatch = html.match(/<head[^>]*>/i);
  if (headMatch && headMatch.index !== undefined) {
    out =
      html.slice(0, headMatch.index) +
      headMatch[0] +
      base +
      injected +
      html.slice(headMatch.index + headMatch[0].length);
  } else {
    out = `${base}${injected}${html}`;
  }

  return new NextResponse(out, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy":
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https://html5.gamemonetize.co https://api.gamemonetize.com https://*.gamemonetize.com; " +
        "connect-src 'self' blob: data: https://html5.gamemonetize.co https://api.gamemonetize.com https://*.gamemonetize.com; " +
        "frame-src 'self' blob: data: https://html5.gamemonetize.co; " +
        "worker-src 'self' blob:; " +
        "object-src 'none'; " +
        "img-src 'self' blob: data: https:; " +
        "media-src 'self' blob: data: https:; " +
        "style-src 'self' 'unsafe-inline' blob: data: https:; " +
        "font-src 'self' data: https:; " +
        "base-uri 'self'",
    },
  });
}
