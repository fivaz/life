import { fail, redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { handleError } from '$lib/server/form-utils';
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

async function getCategory(request: Request): Promise<CCategory> {
	const data = await request.formData();
	const id = Number(data.get('id'));
	const name = data.get('name') as string;
	const color = data.get('color') as string;
	const group = data.get('group') as string;
	const isDefault = !!data.get('isDefault');

	return {
		id,
		name,
		color,
		group,
		isDefault,
	};
}

export const actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		const { id, ...categoryData } = await getCategory(request);

		try {
			const category: CCategory = await prisma.category.create({
				data: { ...categoryData, userId: session.user.userId },
			});

			return { created: category };
		} catch (error) {
			return handleError(error);
		}
	},
	update: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const { id, ...categoryData } = await getCategory(request);

			const category: CCategory = await prisma.category.update({
				where: { id, userId: session.user.userId },
				data: categoryData,
			});
			return { updated: category };
		} catch (error) {
			return handleError(error);
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
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
		} catch (error) {
			return handleError(error);
		}
	},
} satisfies Actions;
