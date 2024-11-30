/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

import { build, files, prerendered, version } from '$service-worker';

const precache_list = [
	'/',
	'/demo',
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
	url: s,
	revision: version,
}));

precacheAndRoute(precache_list);
