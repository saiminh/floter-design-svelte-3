import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.f6d21e24.js","_app/immutable/chunks/scheduler.880d5f2a.js","_app/immutable/chunks/index.f47f4cf9.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
