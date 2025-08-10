import { handleErrorWithSentry, init, sentryHandle } from '@sentry/sveltekit';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProd = import.meta.env.PROD;

if (isProd) {
	init({
		dsn: 'https://8fe2ed7b9efa190c39cf0581cf23339f@o4508857555550208.ingest.de.sentry.io/4509600025608272',
		tracesSampleRate: 1.0,
		// uncomment the line below to enable Spotlight (https://spotlightjs.com)
		// spotlight: import.meta.env.DEV,
	});
}

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle: Handle = isProd
	? sequence(sentryHandle())
	: async ({ event, resolve }) => resolve(event);

// In production, report errors to Sentry; in dev, just log to console
// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError: HandleServerError = isProd
	? handleErrorWithSentry()
	: ({ error }) => {
			console.error(error);
			return { message: 'An error occurred' };
		};
