import * as server from '../entries/pages/work/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/work/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/work/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.92eeee30.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/navigation.31299d66.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/singletons.6f10bc10.js","_app/immutable/chunks/index.4db78ffb.js","_app/immutable/chunks/CldImage.ebf46432.js"];
export const stylesheets = ["_app/immutable/assets/6.21634584.css"];
export const fonts = [];
