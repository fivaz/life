import { fail, redirect } from '@sveltejs/kit';
import { homeRoute } from '$lib/consts';
import { handleError } from '$lib/server/form-utils';
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
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			// find user by key
			// and validate password
			const key = await auth.useKey('username', username.toLowerCase(), password);

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {},
			});

			locals.auth.setSession(session); // set session cookie
		} catch (error) {
			if (
				error instanceof LuciaError &&
				(error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					error: 'Incorrect username or password',
				});
			}

			return handleError(error);
		}

		throw redirect(302, homeRoute);
	},
} satisfies Actions;
