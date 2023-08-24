

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2790111f.js","_app/immutable/chunks/scheduler.8b80e243.js","_app/immutable/chunks/index.b20febff.js","_app/immutable/chunks/stores.b869df48.js","_app/immutable/chunks/singletons.a1418874.js"];
export const stylesheets = [];
export const fonts = [];
