import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { n as navigating } from "../../chunks/stores.js";
const global = "";
const Logo_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "#floter-logo.svelte-vqchku{fill:currentColor;height:100%;width:auto;display:block}",
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<svg id="floter-logo" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 287.4 83.5" width="290" height="85" class="svelte-vqchku"><path id="r" d="M259.9 82.4h-24.2l11.6-54.9h22l-2.7 12.9c4.5-8.9 11-14 18.1-14 1 0 2.1 0 2.7.2l-4.7 22.1c-1.4-.4-3.3-.9-6.4-.9-5.4 0-9.7 2.3-10.8 7.7l-5.6 26.9z"></path><path id="e" d="M237.9 59.3h-35.7c.3 5.2 2.2 7.5 6.5 7.5 2.9 0 5.1-1.5 5.9-4.2h22.3c-4.3 13.2-14.5 20.9-30.4 20.9-16.3 0-26.5-9.7-26.5-25.2 0-17.8 13.4-32 32.3-32 16.3 0 26.5 9.7 26.5 25.2 0 2.7-.4 5.3-.9 7.8zM203.3 50h13.5c-.2-4-1.8-6.5-6-6.5-3.4 0-6.1 2.1-7.5 6.5z"></path><path id="t" d="M171.5 65.9c1.9 0 4.3-.3 6.3-1L174 82.2c-2.5.8-7.1 1.3-11.1 1.3-14 0-23.2-5.1-19.6-22.3l3.5-16.7h-5.5l3.6-17h5.5l3.3-15.4H178l-3.3 15.4h11l-3.6 17h-11l-3.3 15.8c-.9 3.9.3 5.6 3.7 5.6z"></path><polygon id="odash" points="137.1,22.5 94.7,22.4 98.2,5.7 140.6,5.9 "></polygon><path id="o" d="M111.4 26.4c16.7 0 27.2 9.7 27.2 25.2 0 17.8-13.7 32-33.1 32-16.7 0-27.2-9.7-27.2-25.2 0-17.9 13.8-32 33.1-32zm-3.9 36.7c5.3 0 8.8-4.3 8.8-9.4 0-4.2-2.5-6.8-6.6-6.8-5.4 0-8.9 4.3-8.9 9.4 0 4.1 2.5 6.8 6.7 6.8z"></path><polygon id="l" points="45.5,82.4 63,0 87.1,0 69.7,82.4"></polygon><polygon id="F" points="17.5,0 59.7,0 55.5,19.8 36.9,19.8 34.1,33 50.5,33 46.3,52.7 29.9,52.7 23.6,82.4 0,82.4"></polygon></svg>`;
});
const MainNav_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: 'header.svelte-16m5twg.svelte-16m5twg{position:fixed;bottom:0;right:0;z-index:3;padding:var(--spacing-nav);display:flex;gap:0.75em;justify-content:flex-end;align-items:flex-end;box-sizing:border-box}label.svelte-16m5twg.svelte-16m5twg{height:36px}.open.svelte-16m5twg.svelte-16m5twg,.close.svelte-16m5twg.svelte-16m5twg{font-size:4em;line-height:0.3;position:relative;z-index:2;cursor:url("/pointer.svg"), auto}.close.svelte-16m5twg.svelte-16m5twg{top:0.033em;color:#FFF}#menustate.svelte-16m5twg.svelte-16m5twg,#nav.svelte-16m5twg.svelte-16m5twg,.close.svelte-16m5twg.svelte-16m5twg{display:none}#menustate.svelte-16m5twg:checked~#nav.svelte-16m5twg,#menustate:checked~label.svelte-16m5twg .close.svelte-16m5twg{display:block}#menustate:checked~label.svelte-16m5twg .open.svelte-16m5twg{display:none}#nav.svelte-16m5twg.svelte-16m5twg{background-color:var(--color-bg);position:fixed;top:0;left:0;width:100%;height:100%;padding:var(--spacing-outer)}#nav.svelte-16m5twg a.svelte-16m5twg{display:block;line-height:1.3;font-size:3em;font-weight:800;font-style:italic;text-transform:lowercase;text-decoration:none;color:var(--color-text)}@media screen and (min-width: 768px){#nav.svelte-16m5twg a.svelte-16m5twg{font-size:5.5em}}#nav.svelte-16m5twg a.svelte-16m5twg:first-child{margin-top:1em}',
  map: null
};
const MainNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<header class="svelte-16m5twg" data-svelte-h="svelte-18a0w60"><input aria-hidden="true" type="checkbox" id="menustate" class="svelte-16m5twg"> <label for="menustate" aria-hidden="true" class="svelte-16m5twg"><span class="open svelte-16m5twg">≡</span> <span class="close svelte-16m5twg">×</span></label> <nav id="nav" class="svelte-16m5twg"><a href="/" class="svelte-16m5twg">Home</a> <a href="/work" class="svelte-16m5twg">About</a> <a href="/work" class="svelte-16m5twg">Hire</a></nav> </header>`;
});
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.logo.svelte-qrzgwy{height:36px;width:auto;position:fixed;bottom:0;z-index:4;display:block;margin:var(--spacing-nav);cursor:url("/pointer.svg"), auto}@media screen and (max-width: 767px){.header-nav.svelte-qrzgwy{background-color:var(--color-bg);width:100%;height:calc(36px + 2 * var(--spacing-nav));position:fixed;bottom:0;left:0;z-index:3;border-top:1px solid var(--color-text)}}',
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header class="header-nav svelte-qrzgwy"><a href="/" class="logo svelte-qrzgwy">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</a> ${validate_component(MainNav, "MainNav").$$render($$result, {}, {}, {})} </header>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".loader.svelte-l3hxup{position:fixed;top:calc(50% - 0.5em);left:0;width:100%;height:1em;background:var(--color-bg);display:flex;justify-content:center;align-items:center;font-size:2rem;z-index:1000}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_navigating();
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="content">${$navigating ? `<div class="loader svelte-l3hxup">Loading ${escape(JSON.stringify($navigating.to?.route.id))}</div>` : ``} ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
