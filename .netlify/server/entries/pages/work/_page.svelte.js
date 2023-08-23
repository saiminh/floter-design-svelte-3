import { c as create_ssr_component, o as onDestroy, b as add_attribute, d as each, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import "pixi.js";
import "pixi-filters";
import { w as writable } from "../../../chunks/index2.js";
import { C as CldImage } from "../../../chunks/CldImage.js";
const WorkCanvas_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "canvas.svelte-1819g2x{position:fixed;top:0;left:0;z-index:-1}",
  map: null
};
const WorkCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { textsToCanvas = [] } = $$props;
  let { imgsToCanvas = [] } = $$props;
  let { bulgeFactor = 0.15 } = $$props;
  let canvas;
  onDestroy(() => {
  });
  if ($$props.textsToCanvas === void 0 && $$bindings.textsToCanvas && textsToCanvas !== void 0)
    $$bindings.textsToCanvas(textsToCanvas);
  if ($$props.imgsToCanvas === void 0 && $$bindings.imgsToCanvas && imgsToCanvas !== void 0)
    $$bindings.imgsToCanvas(imgsToCanvas);
  if ($$props.bulgeFactor === void 0 && $$bindings.bulgeFactor && bulgeFactor !== void 0)
    $$bindings.bulgeFactor(bulgeFactor);
  $$result.css.add(css$1);
  return `<canvas class="svelte-1819g2x"${add_attribute("this", canvas, 0)}></canvas>`;
});
const workbulge = writable(0.25);
workbulge.subscribe((value) => {
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1wmqw8p.svelte-1wmqw8p{font-size:16vw;font-style:italic;margin:0 0 0.5em 0;letter-spacing:-0.04em;text-align:center;position:fixed;top:0;width:100%;visibility:hidden;transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)}@media screen and (min-width: 768px){h1.svelte-1wmqw8p.svelte-1wmqw8p{font-size:7vw}}h1.svelte-1wmqw8p span.svelte-1wmqw8p{display:inline-block;padding:0 0.25em}h2.svelte-1wmqw8p.svelte-1wmqw8p{line-height:1.1;letter-spacing:-0.025em;font-size:2.5vw;opacity:0;position:absolute;left:0.5em;bottom:0.5em;transform:scale(0.8) translateY(100%);margin:0;padding:0.1em 0.4em 0.2em 0.4em;text-align:center;transform-origin:center center;width:auto;margin:0;background-color:var(--color-bg);color:var(--color-text);transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)}.works.svelte-1wmqw8p .work:not(.active):hover h2.svelte-1wmqw8p{opacity:1;transform:scale(1) translateY(0)}.works.svelte-1wmqw8p.svelte-1wmqw8p{padding:15vw 0.5em 0.5em 0.5em;display:flex;gap:0.25em;flex-wrap:wrap}@media screen and (min-width: 768px){.works.svelte-1wmqw8p.svelte-1wmqw8p{gap:0.25em;padding:8.5vw 0.5em 0.5em 0.5em;width:100%;max-width:1200px;margin:0 auto;padding-bottom:20svh}}.work.svelte-1wmqw8p.svelte-1wmqw8p{flex:0 0 calc(50% - 0.125em);display:block;position:relative;padding:0;transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);text-decoration:none;overflow:hidden}@media screen and (min-width: 768px){.work.svelte-1wmqw8p.svelte-1wmqw8p{flex:0 0 calc(33% - 0.125em)}}.work img{width:100%;height:auto;aspect-ratio:var(--aspect-ratio-heroes);object-fit:fill;visibility:hidden;display:block}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let canvasTextElems;
  let canvasImgElems;
  let bulge = { factor: 0 };
  workbulge.subscribe((val) => {
    bulge.factor = val;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<h1 class="headline svelte-1wmqw8p" data-svelte-h="svelte-1us57h5"><span class="svelte-1wmqw8p">Casestudies</span></h1> <div class="works svelte-1wmqw8p">${each(data.posts, (work, i) => {
    return `<a data-sveltekit-preload-data${add_attribute("href", work.path, 0)} class="work svelte-1wmqw8p">${validate_component(CldImage, "CldImage").$$render(
      $$result,
      {
        src: work.meta.header_bg_image,
        sizes: "(min-width: 768px) 20vw, 50vw",
        alt: work.meta.title,
        width: "2100",
        height: "1400",
        objectFit: "fill",
        placeholder: "blur",
        loading: i < 10 ? "eager" : "lazy"
      },
      {},
      {}
    )} <h2 class="svelte-1wmqw8p">${escape(work.meta.title)}</h2> </a>`;
  })}</div> ${validate_component(WorkCanvas, "WorkCanvas").$$render(
    $$result,
    {
      textsToCanvas: canvasTextElems,
      imgsToCanvas: canvasImgElems,
      bulgeFactor: bulge.factor
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
