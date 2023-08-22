import * as server from '../entries/pages/work/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/work/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/work/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.b81cd63b.js","_app/immutable/chunks/scheduler.880d5f2a.js","_app/immutable/chunks/index.f47f4cf9.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/navigation.95305456.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/singletons.e5eb807e.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/6.123fa86f.css"];
export const fonts = [];
