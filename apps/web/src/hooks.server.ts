import { handleErrorWithSentry, init, sentryHandle } from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

init({
	dsn: 'https://8fe2ed7b9efa190c39cf0581cf23339f@o4508857555550208.ingest.de.sentry.io/4509600025608272',

	tracesSampleRate: 1.0,

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: import.meta.env.DEV,
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
