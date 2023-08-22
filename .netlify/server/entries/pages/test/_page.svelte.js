import { c as create_ssr_component, b as add_attribute } from "../../../chunks/ssr.js";
const myImgSrcSetWebp = "/_app/immutable/assets/formo_hero.76612d9f.webp 1344w, /_app/immutable/assets/formo_hero.3c06dcdd.webp 672w, /_app/immutable/assets/formo_hero.bdd89961.webp 336w";
const myImg = "/_app/immutable/assets/formo_hero.07fbd4ee.png";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  console.log(myImgSrcSetWebp);
  console.log(myImg);
  return `<h1 data-svelte-h="svelte-1igfkj5">hakc</h1> <img${add_attribute("src", myImg, 0)}${add_attribute("srcset", myImgSrcSetWebp, 0)} sizes="(min-width: 768px) 10vw, 100vw" alt="my donkey" width="700">`;
});
export {
  Page as default
};
