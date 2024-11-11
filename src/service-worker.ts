/// <reference types="@sveltejs/kit" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

import { version } from '$service-worker';

declare let self: ServiceWorkerGlobalScope;

const precache_list = [
	'/',
	'/demo',
	'/categories',
	'/goals',
	'/profile',
	'/report',
	'/routine',
	'/tasks',
].map((s) => ({
	revision: version,
	url: s,
}));

const final = [...precache_list, ...self.__WB_MANIFEST];

cleanupOutdatedCaches();

console.log('final', final);

precacheAndRoute(final);

self.skipWaiting();
clientsClaim();
