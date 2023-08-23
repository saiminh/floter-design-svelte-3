import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.47450663.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/0.1cabc979.css"];
export const fonts = [];
