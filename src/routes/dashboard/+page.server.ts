import { fail, redirect } from '@sveltejs/kit';
import type { EEvent } from '$lib';
import { loginRoute } from '$lib';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const events: EEvent[] = await prisma.event.findMany({
		where: { deleted: null, userId: session.user.id }
	});

	return { events };
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
		const description = data.get('description');
		const startDate = data.get('startDate');
		const endDate = data.get('endDate');
		const isDone = data.get('isDone') === 'true';

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (description instanceof File) {
				throw Error('description must be a string');
			}

			if (!startDate || typeof startDate !== 'string') {
				throw Error('startDate is required');
			}

			if (!endDate || typeof endDate !== 'string') {
				throw Error('endDate is required');
			}

			if (id) {
				const event: EEvent = await prisma.event.update({
					where: {
						id,
						userId: session.user.id
					},
					data: {
						name,
						description,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						isDone
					}
				});
				return { saved: event };
			} else {
				const event: EEvent = await prisma.event.create({
					data: {
						userId: session.user.id,
						name,
						description,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						isDone
					}
				});
				return { saved: event };
			}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : "error isn't an instance of error"
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
				userId: session.user.id
			},
			data: {
				isDone
			}
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
				userId: session.user.id
			},
			data: {
				deleted: new Date()
			}
		});
		return { removed: event };
	}
} satisfies Actions;
