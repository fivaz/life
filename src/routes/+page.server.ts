import { fail } from '@sveltejs/kit';
import type { TEvent } from '$lib';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const events: TEvent[] = await prisma.event.findMany({ where: { deleted: null } });
	return { events };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request }) => {
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

			if (typeof startDate !== 'string') {
				throw Error('startDate is required');
			}

			if (typeof endDate !== 'string') {
				throw Error('endDate is required');
			}

			if (id) {
				const event = await prisma.event.update({
					where: {
						id
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
				const event = await prisma.event.create({
					data: {
						name,
						description,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						isDone
					}
				});
				return { saved: event as TEvent };
			}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : "error isn't an instance of error"
			});
		}
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const event = await prisma.event.update({
			where: { id: Number(data.get('id')) },
			data: {
				isDone: !!data.get('isDone')
			}
		});

		return { saved: event as TEvent };
	},
	remove: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const event = await prisma.event.update({
			where: { id },
			data: {
				deleted: new Date()
			}
		});
		return { removed: event as TEvent };
	}
} satisfies Actions;
