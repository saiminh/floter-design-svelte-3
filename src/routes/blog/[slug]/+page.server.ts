import { error } from '@sveltejs/kit';

export function load({ params }) {
  
  const posts = fetch('https://uncommonbio.co/wp-json/wp/v2/posts/').then((r) => r.json().catch((err) => {console.log(err, params)}));

  if (!posts) throw error(404);

  return {
    posts
  };
}