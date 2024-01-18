import { fail, redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw fail(401, { error: unauthorized });
	}

	const categories: CCategory[] = await prisma.category.findMany({
		where: { deleted: null, userId: session.user.userId },
	});

	return { categories };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw redirect(302, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = data.get('name');
		const color = data.get('color');
		const group = data.get('group');
		const isDefault = !!data.get('isDefault');

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (!color || typeof color !== 'string') {
				throw Error('color is required');
			}

			if (!group || typeof group !== 'string') {
				throw Error('group is required');
			}

			if (id) {
				const category: CCategory = await prisma.category.update({
					where: {
						id,
						userId: session.user.userId,
					},
					data: {
						name,
						color,
						group,
						isDefault,
					},
				});
				return { saved: category };
			} else {
				const category: CCategory = await prisma.category.create({
					data: {
						userId: session.user.userId,
						name,
						color,
						group,
						isDefault,
					},
				});
				return { saved: category };
			}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : "error isn't an instance of error",
			});
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const category: CCategory = await prisma.category.update({
			where: {
				id,
				userId: session.user.userId,
			},
			data: {
				deleted: new Date(),
			},
		});
		return { removed: category };
	},
} satisfies Actions;
