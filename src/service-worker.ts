/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precache_list = [
	'/', // Attention: serves stale index, might not be ideal for your use case.
	'/demo',
	'/login',
	'/register',
	'/dashboard/categories',
	'/dashboard/goals',
	'/dashboard/home',
	'/dashboard/profile',
	'/dashboard/report',
	'/dashboard/routine',
	'/dashboard/tasks',
	...build,
	...files,
	...prerendered,
].map((s) => ({
	revision: version,
	url: s,
}));

precacheAndRoute(precache_list);
