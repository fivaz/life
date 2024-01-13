import { fail, redirect } from '@sveltejs/kit';
import { fun, sleep, work } from '$lib/category/seed';
import { homeRoute } from '$lib/consts';
import prisma from '$lib/prisma';
import { handleError } from '$lib/server/form-utils';
import { auth } from '$lib/server/lucia';

import { LuciaError } from 'lucia';
import type { PageServerLoad, Actions } from './$types';

async function createDefaultCategories(userId: string) {
	return prisma.category.createMany({
		data: [
			{
				userId,
				name: work.name,
				isDefault: work.isDefault,
				color: work.color,
				group: work.group,
			},
			{
				userId,
				name: fun.name,
				isDefault: fun.isDefault,
				color: fun.color,
				group: fun.group,
			},
			{
				userId,
				name: sleep.name,
				isDefault: sleep.isDefault,
				color: sleep.color,
				group: sleep.group,
			},
		],
	});
}

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
			const avatar = data.get('avatar') as string;
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
					avatar,
					name,
					username,
				},
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			locals.auth.setSession(session); // set session cookie

			await createDefaultCategories(user.userId);
		} catch (error) {
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Username already taken',
				});
			}

			return handleError(error);
		}

		throw redirect(302, homeRoute);
	},
} satisfies Actions;
