/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import {
	cleanupOutdatedCaches,
	createHandlerBoundToURL,
	precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

const routesToCache = [
	'/',
	'/demo',
	'/categories',
	'/goals',
	'/profile',
	'/report',
	'/routine',
	'/tasks',
];

const precacheList = routesToCache.map((url) => ({ url }));

// self.__WB_MANIFEST is the default injection point
precacheAndRoute([...self.__WB_MANIFEST, ...precacheList]);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }));

self.skipWaiting();
clientsClaim();
