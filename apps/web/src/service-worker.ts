/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

import { version } from '$service-worker';

declare let self: ServiceWorkerGlobalScope;

const precacheRoutes = [
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

const final = [...precacheRoutes, ...self.__WB_MANIFEST];

console.log(final);

cleanupOutdatedCaches();

precacheAndRoute(final);

void self.skipWaiting();
clientsClaim();
