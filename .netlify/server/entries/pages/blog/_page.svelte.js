import { c as create_ssr_component, d as each, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let posts = data.posts;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1 data-svelte-h="svelte-s9fqzi">Blog roll!</h1> ${each(posts, (post) => {
    return `<h2>${escape(post.title.rendered)}</h2>`;
  })}`;
});
export {
  Page as default
};
