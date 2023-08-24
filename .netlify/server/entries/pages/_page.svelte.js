import { c as create_ssr_component, o as onDestroy, a as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import "pixi.js";
import "pixi-filters";
const HomeCanvas_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "canvas.svelte-1819g2x{position:fixed;top:0;left:0;z-index:-1}",
  map: null
};
const HomeCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { textsToCanvas = [] } = $$props;
  let { imgsToCanvas = [] } = $$props;
  let canvas;
  onDestroy(() => {
  });
  if ($$props.textsToCanvas === void 0 && $$bindings.textsToCanvas && textsToCanvas !== void 0)
    $$bindings.textsToCanvas(textsToCanvas);
  if ($$props.imgsToCanvas === void 0 && $$bindings.imgsToCanvas && imgsToCanvas !== void 0)
    $$bindings.imgsToCanvas(imgsToCanvas);
  $$result.css.add(css$1);
  return `<canvas class="svelte-1819g2x"${add_attribute("this", canvas, 0)}></canvas>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".loader.svelte-vkb8yx.svelte-vkb8yx{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);text-align:center}.loader.svelte-vkb8yx p.svelte-vkb8yx{font-size:1.25em}.lds-circle.svelte-vkb8yx.svelte-vkb8yx{display:inline-block;transform:translateZ(1px)}.lds-circle.svelte-vkb8yx>div.svelte-vkb8yx{display:inline-block;width:64px;height:64px;margin:8px;border-radius:50%;background:var(--color-text);animation:svelte-vkb8yx-lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite}@keyframes svelte-vkb8yx-lds-circle{0%,100%{animation-timing-function:cubic-bezier(0.5, 0, 1, 0.5)}0%{transform:rotateY(0deg)}50%{transform:rotateY(1800deg);animation-timing-function:cubic-bezier(0, 0.5, 0.5, 1)}100%{transform:rotateY(3600deg)}}.scroller.svelte-vkb8yx.svelte-vkb8yx{font-size:clamp(32px, 4.5vw, 4.5vw)}section.svelte-vkb8yx.svelte-vkb8yx{scroll-snap-align:start;box-sizing:border-box;padding:var(--spacing-outer);overflow:hidden}@media screen and (min-width: 768px){section.svelte-vkb8yx.svelte-vkb8yx{padding:var(--spacing-outer) calc(var(--spacing-outer) * 2.5)}}section.svelte-vkb8yx.svelte-vkb8yx:last-child{padding-bottom:50svh}.splash.svelte-vkb8yx.svelte-vkb8yx{display:flex;flex-direction:column;justify-content:start;min-height:100svh;justify-content:center;padding:var(--spacing-outer);margin-bottom:-1em}h1.svelte-vkb8yx.svelte-vkb8yx,h2.svelte-vkb8yx.svelte-vkb8yx{line-height:1.1;letter-spacing:-0.025em;font-weight:400;font-style:normal;visibility:hidden;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}h1.svelte-vkb8yx.svelte-vkb8yx{letter-spacing:-0.05em;line-height:0.9;font-size:17vw;margin-top:-0.5em}@media screen and (min-width: 768px){h1.svelte-vkb8yx.svelte-vkb8yx{font-size:12vw}}h2.svelte-vkb8yx.svelte-vkb8yx{font-size:1.25em;font-weight:800;font-style:italic;margin-bottom:0.5em}p.svelte-vkb8yx.svelte-vkb8yx{font-size:0.7em;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a.svelte-vkb8yx.svelte-vkb8yx{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasElems;
  $$result.css.add(css);
  return `${`<div class="loader svelte-vkb8yx" data-svelte-h="svelte-11wygpg"><div class="lds-circle svelte-vkb8yx"><div class="svelte-vkb8yx"></div></div> <p class="svelte-vkb8yx">Loading...</p></div>`} <article class="scroller svelte-vkb8yx" data-svelte-h="svelte-1oqwt97"><section class="splash svelte-vkb8yx"><h1 class="svelte-vkb8yx">Simon Flöter creates products that stand out.</h1></section> <section class="intro svelte-vkb8yx"><h2 class="svelte-vkb8yx">As a Creative Web Developer ...</h2> <div class="cols-2"><div><p class="svelte-vkb8yx">I specialise in delivering beautifully crafted bespoke websites.</p> </div></div> <div class="cta"><a href="/work" class="button svelte-vkb8yx">Learn More</a> <a href="/work" class="button button--primary svelte-vkb8yx">Hire Simon</a></div></section> <section class="more svelte-vkb8yx"><h2 class="svelte-vkb8yx">As a UX &amp; Graphic Designer...</h2> <div class="cols-2"> <div><p class="svelte-vkb8yx">I have designed Websites, Housestyles, Typefaces, Advertising campaigns and Print publications for them.</p></div></div> <div class="cta"><a href="/work" class="button svelte-vkb8yx">Learn More</a> <a href="/work" class="button button--primary svelte-vkb8yx">Hire Simon</a></div></section> <section class="more svelte-vkb8yx"><h2 class="svelte-vkb8yx">I create products that help great companies reach their audiences. Need help?</h2> <div class="cta"><a href="/work" class="button button--xl svelte-vkb8yx">Reach out!</a></div></section></article> ${validate_component(HomeCanvas, "HomeCanvas").$$render($$result, { textsToCanvas: canvasElems }, {}, {})}`;
});
export {
  Page as default
};
