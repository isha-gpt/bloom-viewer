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
		client: {start:"_app/immutable/entry/start.CiQr0Xrr.js",app:"_app/immutable/entry/app.DO3uWfPL.js",imports:["_app/immutable/entry/start.CiQr0Xrr.js","_app/immutable/chunks/DpojAhoj.js","_app/immutable/chunks/BHtLyNKX.js","_app/immutable/chunks/ChBQ6wb0.js","_app/immutable/chunks/Cvg8IsPE.js","_app/immutable/chunks/y-p8HmmE.js","_app/immutable/chunks/HDAF0gzz.js","_app/immutable/entry/app.DO3uWfPL.js","_app/immutable/chunks/ChBQ6wb0.js","_app/immutable/chunks/Cvg8IsPE.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BHtLyNKX.js","_app/immutable/chunks/y-p8HmmE.js","_app/immutable/chunks/lmMq8u3N.js","_app/immutable/chunks/Ch83Ufs9.js","_app/immutable/chunks/CTHtwRlK.js","_app/immutable/chunks/DXsosdFf.js","_app/immutable/chunks/HDAF0gzz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DP2Y-Q7L.js')),
			__memo(() => import('./chunks/1-DcOJ3G-l.js')),
			__memo(() => import('./chunks/2-BV_LfSdU.js')),
			__memo(() => import('./chunks/3-BS7pjD72.js')),
			__memo(() => import('./chunks/4-mIOWs2D2.js')),
			__memo(() => import('./chunks/5-CEeUCEO8.js')),
			__memo(() => import('./chunks/6-DyGpwL6f.js')),
			__memo(() => import('./chunks/7-CRZJszC8.js')),
			__memo(() => import('./chunks/8-B-IVDXOJ.js')),
			__memo(() => import('./chunks/9-BNUxG_KO.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/cache/clear",
				pattern: /^\/api\/cache\/clear\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-mjyrn7yR.js'))
			},
			{
				id: "/api/evaluation/[...path]",
				pattern: /^\/api\/evaluation(?:\/([^]*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-w2yfoBLO.js'))
			},
			{
				id: "/api/judgment/[...path]",
				pattern: /^\/api\/judgment(?:\/([^]*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CtaZPgY1.js'))
			},
			{
				id: "/api/transcripts",
				pattern: /^\/api\/transcripts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-GPTvvcCj.js'))
			},
			{
				id: "/api/transcripts/index",
				pattern: /^\/api\/transcripts\/index\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CcIp2c2i.js'))
			},
			{
				id: "/api/transcripts/list",
				pattern: /^\/api\/transcripts\/list\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-CSuNfPcG.js'))
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
				pattern: /^\/transcript(?:\/([^]*))?\/?$/,
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
