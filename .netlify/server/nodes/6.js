import * as server from '../entries/pages/work/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/work/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/work/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.82cbcbbe.js","_app/immutable/chunks/scheduler.8b80e243.js","_app/immutable/chunks/index.b20febff.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/createCanvasImg.1e4cbea9.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/index.4db78ffb.js","_app/immutable/chunks/singletons.a1418874.js","_app/immutable/chunks/stores.0036eca8.js","_app/immutable/chunks/CldImage.7a2ca419.js"];
export const stylesheets = ["_app/immutable/assets/6.21634584.css"];
export const fonts = [];
