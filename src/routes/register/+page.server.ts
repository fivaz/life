import { fail, redirect } from '@sveltejs/kit';
import { homeRoute } from '$lib/consts';
import { auth } from '$lib/server/lucia';

import { LuciaError } from 'lucia';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, homeRoute);
	}
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
					name,
					username,
				},
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			locals.auth.setSession(session); // set session cookie
		} catch (error) {
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Username already taken',
				});
			}

			console.log(error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}

		throw redirect(302, homeRoute);
	},
} satisfies Actions;
