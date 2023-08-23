import { c as create_ssr_component, o as onDestroy, v as validate_component } from "../../../../chunks/ssr.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { C as CldImage } from "../../../../chunks/CldImage.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "article.svelte-nm1xy1.svelte-nm1xy1{width:100vw;overflow:hidden;padding-bottom:60px}.subnav.svelte-nm1xy1.svelte-nm1xy1{position:fixed;top:0;right:0;z-index:4;padding:var(--spacing-outer)}.heromask.svelte-nm1xy1.svelte-nm1xy1{position:fixed;top:0;left:0;width:100%;z-index:2;height:auto;aspect-ratio:var(--aspect-ratio-heroes);clip-path:polygon(0 0, 100% 0, 100% 100%, 0% 100%)}@media screen and (min-width: 768px){.heromask.svelte-nm1xy1.svelte-nm1xy1{position:fixed}}.heromask img{z-index:0;display:block;position:relative;width:100%;height:100%;aspect-ratio:var(--aspect-ratio-heroes);margin:0;object-fit:fill}.work-content.svelte-nm1xy1.svelte-nm1xy1{padding:0 var(--spacing-outer);padding-top:calc(100vw / var(--aspect-ratio-heroes) + 1.5em);position:relative;z-index:1;margin-top:0;color:var(--color-text)}@media screen and (min-width: 768px){.work-content.svelte-nm1xy1.svelte-nm1xy1{margin-left:40vw;max-width:60vw;padding-top:calc(3 * var(--spacing-outer));padding-left:calc(var(--spacing-outer) * 1.5);padding-right:calc(var(--spacing-outer) * 2.5)}}@media screen and (min-width: 768px){.work-content-text.svelte-nm1xy1.svelte-nm1xy1{border-top:1px solid var(--color-text)}}h1.svelte-nm1xy1.svelte-nm1xy1{position:relative;z-index:1;margin:0}@media screen and (min-width: 768px){h1.svelte-nm1xy1.svelte-nm1xy1{padding:0 0 1em 0}}h1.svelte-nm1xy1 .name.svelte-nm1xy1{display:none}h1.svelte-nm1xy1 .svg-logo.svelte-nm1xy1 svg{width:auto;height:auto;max-width:250px;max-height:80px;margin-bottom:1em}@media screen and (min-width: 768px){h1.svelte-nm1xy1 .svg-logo.svelte-nm1xy1 svg{max-width:400px;max-height:200px}}.header-nav{transition:all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)}.work .header-nav{transform:translateY(100%)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  gsap.registerPlugin(ScrollTrigger);
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return ` <div class="heromask svelte-nm1xy1">${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: data.header_bg_image,
      alt: data.title,
      sizes: "100vw",
      width: 2100,
      height: 1400,
      loading: "eager",
      objectFit: "fill"
    },
    {},
    {}
  )}</div> <div class="subnav svelte-nm1xy1" data-svelte-h="svelte-ywmcpa"><a href="/work" class="subnav-item">← Back</a></div> <article class="work svelte-nm1xy1">${``} </article>`;
});
export {
  Page as default
};
