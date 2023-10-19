import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
		callbacks: {
			async session({ session, user, token }) {
				console.log('session - session', session);
				console.log('session - user', user);
				console.log('session - token', token);
				return session;
			},
			jwt({ token, user, account, profile }) {
				console.log('jwt - token', token);
				console.log('jwt - user', user);
				console.log('jwt - account', account);
				console.log('jwt - profile', profile);
				return token;
			}
		}
	}),
	authorization
);
