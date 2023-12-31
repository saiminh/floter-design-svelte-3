// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
    preprocess(),
    vitePreprocess(),
    mdsvex({
      extensions: ['.md']
    })  
  ],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
      // if true, will create a Netlify Edge Function rather
      // than using standard Node-based functions
      edge: false,
      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app.
      // if `edge` is true, this option cannot be used
      split: false
    }),
    csp: {
      mode: 'auto',
      directives: {
        'default-src': ['self'],
        'img-src': ['self', '*.cloudinary.com', 'data:'],
        'media-src': ['self', '*.cloudinary.com'],
        'style-src': ['self', 'unsafe-inline', '*.typekit.net'],
        "font-src": ['self', '*.typekit.net'],
        'script-src': ['self', 'unsafe-eval', 'unsafe-inline'],
        "upgrade-insecure-requests": true
      },
    },
    // prerender: {
    //   force: true
    // }
	},
  extensions: ['.svelte', '.md']
};

export default config;
