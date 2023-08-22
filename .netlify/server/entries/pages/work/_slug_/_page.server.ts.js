const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
async function load({ params }) {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../md/adidas.md": () => import("../../../../chunks/adidas.js"), "../md/formo.md": () => import("../../../../chunks/formo.js"), "../md/jpl.md": () => import("../../../../chunks/jpl.js") }), `../md/${params.slug}.md`);
    const srcJson = await import(
      /* @vite-ignore */
      `../../../lib/assets${post.metadata.header_bg_image}?w=336&format=webp`
    );
    const src = JSON.stringify(srcJson.default).replaceAll('"', "");
    const srcsetJson = await import(
      /* @vite-ignore */
      `../../../lib/assets${post.metadata.header_bg_image}?w=1344;672;336&format=webp&as=srcset`
    );
    const srcSet = JSON.stringify(srcsetJson.default).replaceAll('"', "");
    const { title, date, header_bg_image, svg, video } = post.metadata;
    const Content = post.default.render();
    return {
      title,
      date,
      header_bg_image,
      svg,
      video,
      Content,
      src,
      srcSet
    };
  } catch (error) {
    console.error(error);
  }
}
export {
  load
};
