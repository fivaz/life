import { fail, redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import type { EEvent } from '$lib/event/utils';
import prisma from '$lib/prisma';
import { loginRoute } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const [events, categories]: [events: EEvent[], categories: CCategory[]] = await Promise.all([
		prisma.event.findMany({
			where: { deleted: null, userId: session.user.id },
			include: { category: true },
		}),
		prisma.category.findMany({
			where: { deleted: null, userId: session.user.id },
		}),
	]);

	return { events, categories };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		try {
			const data = await request.formData();
			const id = Number(data.get('id'));
			const isDone = data.get('isDone') === 'true';
			const categoryId = Number(data.get('categoryId'));
			let name = data.get('name') as string;
			const description = data.get('description') as string;
			const startDate = new Date(data.get('startDate') as string);
			const endDate = new Date(data.get('endDate') as string);
			const categoryName = data.get('categoryName') as string;

			if (!categoryName || !categoryId) {
				throw Error('internal error, please refresh the page');
			}

			if (!name) {
				name = categoryName;
			}

			if (startDate > endDate) {
				throw Error('startDate should be before endDate');
			}

			if (startDate)
				if (id) {
					const event: EEvent = await prisma.event.update({
						where: {
							id,
							userId: session.user.id,
						},
						data: {
							name,
							description,
							startDate,
							endDate,
							isDone,
							categoryId,
						},
						include: { category: true },
					});
					return { saved: event };
				} else {
					const event: EEvent = await prisma.event.create({
						data: {
							userId: session.user.id,
							name,
							description,
							startDate,
							endDate,
							isDone,
							categoryId,
						},
						include: { category: true },
					});
					return { saved: event };
				}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}
	},
	toggle: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const isDone = !!data.get('isDone');
		const event: EEvent = await prisma.event.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				isDone,
			},
			include: { category: true },
		});

		return { saved: event };
	},
	remove: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const event: EEvent = await prisma.event.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				deleted: new Date(),
			},
			include: { category: true },
		});
		return { removed: event };
	},
} satisfies Actions;
