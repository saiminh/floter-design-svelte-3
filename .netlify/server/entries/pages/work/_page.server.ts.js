const fetchMarkdownPosts = async () => {
  const allPostFiles = /* @__PURE__ */ Object.assign({ "/src/routes/work/md/adidas.md": () => import("../../../chunks/adidas.js"), "/src/routes/work/md/formo.md": () => import("../../../chunks/formo.js"), "/src/routes/work/md/jpl.md": () => import("../../../chunks/jpl.js") });
  const iterablePostFiles = Object.entries(allPostFiles);
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const postPath = path.slice(11, -3).replace("work/md/", "work/");
      const data = await resolver();
      const postData = data;
      const content = postData.default.render();
      return {
        meta: postData.metadata,
        path: postPath,
        Content: content.html
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
    // images
  };
}
export {
  load
};
