import * as server from '../entries/pages/blog/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.d8704671.js","_app/immutable/chunks/scheduler.8b80e243.js","_app/immutable/chunks/index.b20febff.js"];
export const stylesheets = [];
export const fonts = [];
