import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.90216c4c.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
