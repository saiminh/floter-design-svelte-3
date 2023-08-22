import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  JSON.stringify(data);
  let dataone = data.posts[1].content.rendered;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 data-svelte-h="svelte-7vdpfc">Blog post</h1> <p><!-- HTML_TAG_START -->${dataone}<!-- HTML_TAG_END --></p>`;
});
export {
  Page as default
};
