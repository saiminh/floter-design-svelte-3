import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { C as CldImage } from "../../../../chunks/CldImage.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".work.svelte-lxhlir.svelte-lxhlir{width:100vw;min-height:100svh;overflow:hidden;box-sizing:border-box;transform:translateY(100%)}@media screen and (min-width: 768px){.work.svelte-lxhlir.svelte-lxhlir{transform:translateX(100%)}}.subnav.svelte-lxhlir.svelte-lxhlir{position:fixed;top:0;right:0;z-index:4;padding:var(--spacing-outer)}.heromask.svelte-lxhlir.svelte-lxhlir{position:fixed;top:0;left:0;aspect-ratio:var(--aspect-ratio-heroes);width:100%;height:auto;z-index:2;clip-path:polygon(0 0, 100% 0, 100% 100%, 0% 100%)}.heromask img{z-index:0;display:block;position:relative;width:100%;height:100%;aspect-ratio:var(--aspect-ratio-heroes);margin:0;object-fit:fill}.work-content.svelte-lxhlir.svelte-lxhlir{padding:0 var(--spacing-outer);padding-top:calc(66.6vw + 1em);position:relative;z-index:1;color:var(--color-text)}.work-content.svelte-lxhlir .svelte-lxhlir:last-child{margin-bottom:100px}@media screen and (min-width: 768px){.work-content.svelte-lxhlir.svelte-lxhlir{margin-left:40vw;max-width:60vw;padding-top:calc(3 * var(--spacing-outer));padding-left:calc(var(--spacing-outer) * 1.5);padding-right:calc(var(--spacing-outer) * 2.5)}}@media screen and (min-width: 768px){.work-content-text.svelte-lxhlir.svelte-lxhlir{border-top:1px solid var(--color-text)}}h1.svelte-lxhlir.svelte-lxhlir{position:relative;z-index:1;margin:0}@media screen and (min-width: 768px){h1.svelte-lxhlir.svelte-lxhlir{padding:0 0 1em 0}}h1.svelte-lxhlir .name.svelte-lxhlir{display:none}h1.svelte-lxhlir .svg-logo.svelte-lxhlir svg{width:auto;height:auto;max-width:250px;max-height:80px;margin-bottom:1em}@media screen and (min-width: 768px){h1.svelte-lxhlir .svg-logo.svelte-lxhlir svg{max-width:400px;max-height:200px}}.header-nav{transition:all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)}.work .header-nav{transform:translateY(100%)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  gsap.registerPlugin(ScrollTrigger);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="heromask svelte-lxhlir">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: data.header_bg_image,
      alt: data.title,
      sizes: "100vw",
      width: 2100,
      height: 1400,
      placeholder: "blur",
      loading: "eager",
      objectFit: "fill"
    },
    {},
    {}
  )}</div> <div class="subnav svelte-lxhlir" data-svelte-h="svelte-ywmcpa"><a href="/work" class="subnav-item">← Back</a></div> <article class="work svelte-lxhlir">${``} </article>`;
});
export {
  Page as default
};
