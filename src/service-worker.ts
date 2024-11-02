/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

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
