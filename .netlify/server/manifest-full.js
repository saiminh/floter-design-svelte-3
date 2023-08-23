export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","cursor.png","cursor.svg","favicon.png","pointer.png","pointer.svg","work/.DS_Store","work/adidas/adidas_hero.jpg","work/formo/formo-rec.mp4","work/formo/formo-rec.webm","work/formo/formo_hero.png","work/jpl/jpl_hero.jpg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".mp4":"video/mp4",".webm":"video/webm"},
	_: {
		client: {"start":"_app/immutable/entry/start.e3c93b33.js","app":"_app/immutable/entry/app.590275c4.js","imports":["_app/immutable/entry/start.e3c93b33.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/singletons.6f10bc10.js","_app/immutable/entry/app.590275c4.js","_app/immutable/chunks/scheduler.cd8ec38c.js","_app/immutable/chunks/index.9e7d825d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/test",
				pattern: /^\/test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/work",
				pattern: /^\/work\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/work/[slug]",
				pattern: /^\/work\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
