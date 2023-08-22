import * as server from '../entries/pages/work/_slug_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/work/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/work/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.9fe2c4e0.js","_app/immutable/chunks/scheduler.880d5f2a.js","_app/immutable/chunks/index.f47f4cf9.js","_app/immutable/chunks/index.4db78ffb.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js"];
export const stylesheets = ["_app/immutable/assets/7.a46f57c1.css"];
export const fonts = [];
