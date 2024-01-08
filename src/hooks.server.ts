import Credentials from '@auth/core/providers/credentials';
import GitHub from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { homeRoute, loginRoute } from '$lib/consts';
import { getUser, saltAndHashPassword } from '$lib/login-utils';

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith(homeRoute)) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, loginRoute);
		}
	}
	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		pages: {
			signIn: '/login',
		},
		session: {
			strategy: 'jwt',
		},
		// adapter: PrismaAdapter(prisma),
		providers: [
			GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
			Credentials({
				credentials: {
					email: { label: 'Username', type: 'text ' },
					password: { label: 'Password', type: 'password' },
				},
				async authorize(credentials, req) {
					//TODO validate fields
					const { email, password } = credentials as { email: string; password: string };

					const hashedPassword = saltAndHashPassword(password);
					return getUser(email, hashedPassword);
				},
			}),
		],
		callbacks: {
			async session({ session, user, token }) {
				if (user && session.user) {
					session.user.id = user.id;
				}
				return session;
			},
		},
	}),
	authorization,
);
