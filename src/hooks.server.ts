import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';

const authorization: Handle = async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith(dashboardRoute)) {
	// 	const session = await event.locals.getSession();
	// if (!session) {
	// 	throw redirect(303, loginRoute);
	// }
	// }

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		adapter: PrismaAdapter(prisma),
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
		callbacks: {
			async session({ session, user, token }) {
				console.log('session', session);
				console.log('user', user);
				if (user) {
					session.user.id = user.id;
				}
				return session;
			},
		},
	}),
	authorization,
);
