import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.87056fa6.js","_app/immutable/chunks/stores.0036eca8.js","_app/immutable/chunks/singletons.a1418874.js","_app/immutable/chunks/scheduler.8b80e243.js","_app/immutable/chunks/index.b20febff.js","_app/immutable/chunks/index.4db78ffb.js","_app/immutable/chunks/stores.b869df48.js"];
export const stylesheets = ["_app/immutable/assets/0.bc59ba78.css"];
export const fonts = [];
