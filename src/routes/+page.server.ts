import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.event.findMany();

	return { events: response };
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
				return { save: true, data: event };
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
				return { save: true, data: event };
			}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : "error isn't an instance of error"
			});
		}
	},
	toggle: async ({ request }) => {
		// TODO check why the isDone arriving here is either null or "on"
		const data = await request.formData();
		const event = await prisma.event.update({
			where: { id: Number(data.get('id')) },
			data: {
				isDone: !!data.get('isDone')
			}
		});
		return { save: true, data: event };
	},
	remove: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		await prisma.event.delete({
			where: { id }
		});
		return { remove: true, data: { id } };
	}
} satisfies Actions;
