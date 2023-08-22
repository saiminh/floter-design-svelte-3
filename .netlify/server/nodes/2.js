

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.a824365c.js","_app/immutable/chunks/scheduler.880d5f2a.js","_app/immutable/chunks/index.f47f4cf9.js","_app/immutable/chunks/navigation.95305456.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/singletons.e5eb807e.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/2.aabebfd8.css"];
export const fonts = [];
