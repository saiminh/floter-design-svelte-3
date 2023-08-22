const fetchMarkdownPosts = async () => {
  const allPostFiles = /* @__PURE__ */ Object.assign({ "/src/routes/work/md/adidas.md": () => import("../../../chunks/adidas.js"), "/src/routes/work/md/formo.md": () => import("../../../chunks/formo.js"), "/src/routes/work/md/jpl.md": () => import("../../../chunks/jpl.js") });
  const iterablePostFiles = Object.entries(allPostFiles);
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const postPath = path.slice(11, -3).replace("work/md/", "work/");
      const data = await resolver();
      const postData = data;
      const content = postData.default.render();
      const srcJson = await import(
        /* @vite-ignore */
        "./assets" + postData.metadata.header_bg_image + "?w=336&format=webp"
      );
      const src = JSON.stringify(srcJson.default).replaceAll('"', "");
      const srcsetJson = await import(
        /* @vite-ignore */
        "./assets" + postData.metadata.header_bg_image + "?w=1344;672;336&format=webp&as=srcset"
      );
      const srcset = JSON.stringify(srcsetJson.default).replaceAll('"', "");
      return {
        meta: postData.metadata,
        path: postPath,
        Content: content.html,
        src,
        srcset
      };
    })
  );
  return allPosts;
};
async function load() {
  const posts = await fetchMarkdownPosts();
  if (!posts)
    console.error("No posts found");
  return {
    posts
  };
}
export {
  load
};
