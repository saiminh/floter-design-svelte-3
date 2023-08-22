import { c as create_ssr_component, o as onDestroy, b as add_attribute, v as validate_component } from "../../chunks/ssr.js";
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
  code: ".scroller.svelte-m5zqpe{font-size:clamp(32px, 4.5vw, 4.5vw)}section.svelte-m5zqpe{scroll-snap-align:start;box-sizing:border-box;padding:var(--spacing-outer);overflow:hidden}@media screen and (min-width: 768px){section.svelte-m5zqpe{padding:var(--spacing-outer) calc(var(--spacing-outer) * 2.5)}}section.svelte-m5zqpe:last-child{padding-bottom:50svh}.splash.svelte-m5zqpe{display:flex;flex-direction:column;justify-content:start;min-height:100svh;justify-content:center;padding:var(--spacing-outer);margin-bottom:-1em}h1.svelte-m5zqpe,h2.svelte-m5zqpe{line-height:1.1;letter-spacing:-0.025em;font-weight:400;font-style:normal;opacity:0;margin:0;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}h1.svelte-m5zqpe{letter-spacing:-0.05em;line-height:0.9;font-size:17vw;margin-top:-0.5em}@media screen and (min-width: 768px){h1.svelte-m5zqpe{font-size:12vw}}h2.svelte-m5zqpe{font-size:1.25em;font-weight:800;font-style:italic;margin-bottom:0.5em}p.svelte-m5zqpe{font-size:0.7em;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a.svelte-m5zqpe{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasElems;
  $$result.css.add(css);
  return `<article class="scroller svelte-m5zqpe" data-svelte-h="svelte-hqummz"><section class="splash svelte-m5zqpe"><h1 class="svelte-m5zqpe">Simon Flöter creates products that stand out.</h1></section> <section class="intro svelte-m5zqpe"><h2 class="svelte-m5zqpe">As a Creative Web Developer ...</h2> <div class="cols-2"><div><p class="svelte-m5zqpe">I specialise in delivering beautifully crafted bespoke websites.</p> </div></div> <div class="cta"><a href="/work" class="button svelte-m5zqpe">Learn More</a> <a href="/work" class="button button--primary svelte-m5zqpe">Hire Simon</a></div></section> <section class="more svelte-m5zqpe"><h2 class="svelte-m5zqpe">As a UX &amp; Graphic Designer...</h2> <div class="cols-2"> <div><p class="svelte-m5zqpe">I have designed Websites, Housestyles, Typefaces, Advertising campaigns and Print publications for them.</p></div></div> <div class="cta"><a href="/work" class="button svelte-m5zqpe">Learn More</a> <a href="/work" class="button button--primary svelte-m5zqpe">Hire Simon</a></div></section> <section class="more svelte-m5zqpe"><h2 class="svelte-m5zqpe">I create products that help great companies reach their audiences. Need help?</h2> <div class="cta"><a href="/work" class="button button--xl svelte-m5zqpe">Reach out!</a></div></section></article> ${validate_component(HomeCanvas, "HomeCanvas").$$render($$result, { textsToCanvas: canvasElems }, {}, {})}`;
});
export {
  Page as default
};
