import { e as error } from "../../../chunks/index.js";
function load({ params }) {
  const posts = fetch("https://uncommonbio.co/wp-json/wp/v2/pages/").then((r) => r.json().catch((err) => {
    console.log(err, params);
  }));
  if (!posts)
    throw error(404);
  return {
    posts
  };
}
export {
  load
};