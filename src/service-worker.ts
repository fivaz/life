/// <reference types="@sveltejs/kit" />
import { routes } from '$lib/consts';
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precacheList = [
	// Attention: serves stale index, might not be ideal for your use case.
	...routes,
	...build,
	...files,
	...prerendered,
].map((s) => ({
	revision: version,
	url: s,
}));

precacheAndRoute(precacheList);
