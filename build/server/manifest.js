const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon-16x16.png","favicon-96x96.png","favicon.ico","favicon.png","favicon.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.CVC4iQut.js",app:"_app/immutable/entry/app.Cx4yEUf7.js",imports:["_app/immutable/entry/start.CVC4iQut.js","_app/immutable/chunks/BE0jUqnW.js","_app/immutable/chunks/C-E9t2Sf.js","_app/immutable/chunks/DDSnUQRm.js","_app/immutable/chunks/Cw2wGIIF.js","_app/immutable/chunks/DQftmrar.js","_app/immutable/chunks/BhP1P8qK.js","_app/immutable/entry/app.Cx4yEUf7.js","_app/immutable/chunks/DDSnUQRm.js","_app/immutable/chunks/Cw2wGIIF.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C-E9t2Sf.js","_app/immutable/chunks/DQftmrar.js","_app/immutable/chunks/Cufvb6Zw.js","_app/immutable/chunks/BHzfkhi9.js","_app/immutable/chunks/BHXEmAAv.js","_app/immutable/chunks/DjMDWNJ7.js","_app/immutable/chunks/BhP1P8qK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-VuQGvtDb.js')),
			__memo(() => import('./chunks/1-DwUf7mWW.js')),
			__memo(() => import('./chunks/2-ChgVUVJF.js')),
			__memo(() => import('./chunks/3-VxOnvkOi.js')),
			__memo(() => import('./chunks/4-Bz0kOrUi.js')),
			__memo(() => import('./chunks/5-CdnkAryp.js')),
			__memo(() => import('./chunks/6-Clr5TTjb.js')),
			__memo(() => import('./chunks/7-CGc2uKas.js')),
			__memo(() => import('./chunks/8-WkyWNE92.js')),
			__memo(() => import('./chunks/9-BbV-JsTO.js'))
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
				id: "/api/transcripts",
				pattern: /^\/api\/transcripts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CUtrsbq1.js'))
			},
			{
				id: "/api/transcripts/list",
				pattern: /^\/api\/transcripts\/list\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-vLxRuuRU.js'))
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/demo/message-rendering",
				pattern: /^\/demo\/message-rendering\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/demo/message-shortlist",
				pattern: /^\/demo\/message-shortlist\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/perf-test",
				pattern: /^\/perf-test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/test-new-api",
				pattern: /^\/test-new-api\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/test-viewer",
				pattern: /^\/test-viewer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/transcript/[...path]",
				pattern: /^\/transcript(?:\/(.*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
