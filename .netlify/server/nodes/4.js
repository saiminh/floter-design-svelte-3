import * as server from '../entries/pages/blog/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.9ae234c4.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js"];
export const stylesheets = [];
export const fonts = [];
