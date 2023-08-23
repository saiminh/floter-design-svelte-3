

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.108d664b.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js","_app/immutable/chunks/navigation.31299d66.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/singletons.6f10bc10.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/2.aabebfd8.css"];
export const fonts = [];
