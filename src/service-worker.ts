/// <reference types="@sveltejs/kit" />
// eslint-disable-next-line import/no-unresolved
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precache_list = [
	'/', // Attention: serves stale index, might not be ideal for your use case.
	'/login',
	'/register',
	'/dashboard/home',
	'/dashboard/categories',
	'/dashboard/tasks',
	'/dashboard/goals',
	...build,
	...files,
	...prerendered,
].map((s) => ({
	url: s,
	revision: version,
}));

precacheAndRoute(precache_list);
