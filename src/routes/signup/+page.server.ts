import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const username = data.get('username') as string;
			const password = data.get('password') as string;

			const user = await auth.createUser({
				key: {
					providerId: 'username', // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password, // hashed by Lucia
				},
				attributes: {
					username,
				},
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			console.log('session', session);

			locals.auth.setSession(session); // set session cookie
		} catch (error) {
			// if (
			// 	error instanceof SomeDatabaseError &&
			// 	error.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
			// ) {
			// 	return fail(400, {
			// 		message: 'Username already taken',
			// 	});
			// }

			console.log(error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}

		throw redirect(302, '/');
	},
} satisfies Actions;
