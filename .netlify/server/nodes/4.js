import * as server from '../entries/pages/blog/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.22335af8.js","_app/immutable/chunks/scheduler.880d5f2a.js","_app/immutable/chunks/index.f47f4cf9.js"];
export const stylesheets = [];
export const fonts = [];
