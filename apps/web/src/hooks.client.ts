import { handleErrorWithSentry, init, replayIntegration } from '@sentry/sveltekit';
import type { HandleClientError } from '@sveltejs/kit';

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isProd = import.meta.env.PROD;

if (isProd) {
	init({
		dsn: 'https://8fe2ed7b9efa190c39cf0581cf23339f@o4508857555550208.ingest.de.sentry.io/4509600025608272',

		tracesSampleRate: 1.0,
		// This sets the sample rate to be 10%. You may want this to be 100% while
		// in development and sample at a lower rate in production
		replaysSessionSampleRate: 0.1,

		// If the entire session is not sampled, use the below sample rate to sample
		// sessions when an error occurs.
		replaysOnErrorSampleRate: 1.0,

		// If you don't want to use Session Replay, just remove the line below:
		integrations: [replayIntegration()],
	});
}

// If you have a custom error handler, pass it to `handleErrorWithSentry` in prod; otherwise log
export const handleError: HandleClientError = isProd
	? handleErrorWithSentry()
	: ({ error }) => {
			console.error(error);
			return { message: 'An error occurred' };
		};
