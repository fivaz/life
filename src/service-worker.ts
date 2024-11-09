/// <reference types="@sveltejs/kit" />
import { precacheAndRoute } from 'workbox-precaching';

import { build, files, prerendered, version } from '$service-worker';

const precache_list = [
	'/',
	'/demo',
	'/login',
	'/register',
	'/categories',
	'/goals',
	'/profile',
	'/report',
	'/routine',
	'/tasks',
	...build,
	...files,
	...prerendered,
].map((s) => ({
	revision: version,
	url: s,
}));

precacheAndRoute(precache_list);
