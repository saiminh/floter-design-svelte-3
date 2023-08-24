

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.7bf3e2ea.js","_app/immutable/chunks/scheduler.8b80e243.js","_app/immutable/chunks/index.b20febff.js","_app/immutable/chunks/createCanvasImg.1e4cbea9.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/2.4c80624d.css"];
export const fonts = [];
