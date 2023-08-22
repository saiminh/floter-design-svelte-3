import { c as create_ssr_component, o as onDestroy, b as add_attribute } from "../../../../chunks/ssr.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "article.svelte-1nwbod6.svelte-1nwbod6{width:100vw;overflow:hidden;padding-bottom:60px}.subnav.svelte-1nwbod6.svelte-1nwbod6{position:fixed;top:0;right:0;z-index:4;padding:var(--spacing-outer)}.heromask.svelte-1nwbod6.svelte-1nwbod6{position:fixed;top:0;left:0;width:100%;z-index:2;height:auto;aspect-ratio:var(--aspect-ratio-heroes);clip-path:polygon(0 0, 100% 0, 100% 100%, 0% 100%)}@media screen and (min-width: 768px){.heromask.svelte-1nwbod6.svelte-1nwbod6{position:fixed}}.hero.svelte-1nwbod6.svelte-1nwbod6{width:100%;height:100%;object-fit:fill;z-index:0;display:block;position:relative;perspective:400px}.work-content.svelte-1nwbod6.svelte-1nwbod6{padding:0 var(--spacing-outer);padding-top:calc(100vw / var(--aspect-ratio-heroes) + 1.5em);position:relative;z-index:1;margin-top:0;color:var(--color-text)}@media screen and (min-width: 768px){.work-content.svelte-1nwbod6.svelte-1nwbod6{margin-left:40vw;max-width:60vw;padding-top:calc(3 * var(--spacing-outer));padding-left:calc(var(--spacing-outer) * 1.5);padding-right:calc(var(--spacing-outer) * 2.5)}}@media screen and (min-width: 768px){.work-content-text.svelte-1nwbod6.svelte-1nwbod6{border-top:1px solid var(--color-text)}}h1.svelte-1nwbod6.svelte-1nwbod6{position:relative;z-index:1;margin:0}@media screen and (min-width: 768px){h1.svelte-1nwbod6.svelte-1nwbod6{padding:0 0 1em 0}}h1.svelte-1nwbod6 .name.svelte-1nwbod6{display:none}h1.svelte-1nwbod6 .svg-logo.svelte-1nwbod6 svg{width:auto;height:auto;max-width:250px;max-height:80px;margin-bottom:1em}@media screen and (min-width: 768px){h1.svelte-1nwbod6 .svg-logo.svelte-1nwbod6 svg{max-width:400px;max-height:200px}}.header-nav{transition:all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)}.work .header-nav{transform:translateY(100%)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  gsap.registerPlugin(ScrollTrigger);
  onDestroy(() => {
    document.body.classList.remove("work");
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="heromask svelte-1nwbod6"><img class="hero svelte-1nwbod6"${add_attribute("src", data.src, 0)}${add_attribute("srcset", data.srcSet, 0)}${add_attribute("alt", data.title, 0)} loading="eager" decoding="sync"></div> <div class="subnav svelte-1nwbod6" data-svelte-h="svelte-ywmcpa"><a href="/work" class="subnav-item">← Back</a></div> <article class="work svelte-1nwbod6">${``} </article>`;
});
export {
  Page as default
};
