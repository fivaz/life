import { fail, redirect } from '@sveltejs/kit';
import type { EEvent } from '$lib/event/utils';
import prisma from '$lib/prisma';
import { loginRoute } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const toDos: EEvent[] = await prisma.event.findMany({
		where: { deleted: null, userId: session.user.id, isDone: false },
		include: { category: true },
	});

	return { toDos };
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

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (id) {
				const event: EEvent = await prisma.event.update({
					where: {
						id,
						userId: session.user.id,
					},
					data: {
						name,
					},
					include: { category: true },
				});
				return { saved: event };
			} else {
				const event: EEvent = await prisma.event.create({
					data: {
						userId: session.user.id,
						name,
						description: null,
						isDone: false,
						startDate: new Date(),
						endDate: new Date(),
						categoryId: 1,
					},
					include: { category: true },
				});
				return { saved: event };
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
