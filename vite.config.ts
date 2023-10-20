import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

export default defineConfig({
	plugins: [ sveltekit() ]
});
