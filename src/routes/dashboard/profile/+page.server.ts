// routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, loginRoute);
	}
	return {
		userId: session.user.userId,
		name: session.user.name,
		username: session.user.username,
	};
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const username = data.get('username') as string;
			const password = data.get('password') as string;

			if (password) {
				await auth.updateKeyPassword('username', username, password);
			}

			const user = await prisma.user.update({
				where: { id: session.user.userId },
				data: {
					name,
					username,
				},
			});

			return { saved: user };
		} catch (error) {
			console.log('error', error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return fail(401);
		}
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie

		throw redirect(302, loginRoute); // redirect to login page
	},
};
