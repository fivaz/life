import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { dashboardRoute } from '$lib';
import prisma from '$lib/prisma';

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith(dashboardRoute)) {
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
		adapter: PrismaAdapter(prisma),
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
		callbacks: {
			async session({ session, user, token }) {
				return {
					...session,
					user: {
						...session.user,
						...(user && { id: user.id })
					}
				};
			}
		}
	}),
	authorization
);
