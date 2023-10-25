import { fail, redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import prisma from '$lib/prisma';
import { loginRoute } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const categories: CCategory[] = await prisma.category.findMany({
		where: { deleted: null, userId: session.user.id },
	});

	return { categories };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = data.get('name');
		const color = data.get('color');
		const isDefault = !!data.get('isDefault');

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (!color || typeof color !== 'string') {
				throw Error('color is required');
			}

			if (id) {
				const category: CCategory = await prisma.category.update({
					where: {
						id,
						userId: session.user.id,
					},
					data: {
						name,
						color,
						isDefault,
					},
				});
				return { saved: category };
			} else {
				const category: CCategory = await prisma.category.create({
					data: {
						userId: session.user.id,
						name,
						color,
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
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const category: CCategory = await prisma.category.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				deleted: new Date(),
			},
		});
		return { removed: category };
	},
} satisfies Actions;
