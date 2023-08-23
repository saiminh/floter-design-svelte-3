

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.1f7805c5.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js","_app/immutable/chunks/navigation.6a0efe7b.js","_app/immutable/chunks/ScrollTrigger.96597ec4.js","_app/immutable/chunks/singletons.3c20dddb.js","_app/immutable/chunks/index.4db78ffb.js"];
export const stylesheets = ["_app/immutable/assets/2.aabebfd8.css"];
export const fonts = [];
