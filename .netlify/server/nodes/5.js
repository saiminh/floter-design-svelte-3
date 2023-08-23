

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/test/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.e9f1a99f.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js"];
export const stylesheets = [];
export const fonts = [];
