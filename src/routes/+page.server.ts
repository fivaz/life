import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.event.findMany();

	return { events: response };
}) satisfies PageServerLoad;

export const actions = {
	submit: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const description = data.get('description');
		const startDate = data.get('startDate');
		const endDate = data.get('endDate');
		const isDone = !!data.get('isDone');

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (typeof description !== 'string') {
				throw Error('description must be a string');
			}

			if (typeof startDate !== 'string') {
				throw Error('startDate is required');
			}

			if (typeof endDate !== 'string') {
				throw Error('endDate is required');
			}

			if (id) {
				return await prisma.event.update({
					where: {
						id: Number(id)
					},
					data: {
						name,
						description,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						isDone
					}
				});
			} else {
				console.log('jere');
				return await prisma.event.create({
					data: {
						name,
						description,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
						isDone
					}
				});
			}
		} catch (error) {
			return fail(422, {
				id: Number(id),
				name: name,
				description,
				isDone,
				startDate,
				endDate,
				error: error instanceof Error ? error.message : "error isn't an instance of error"
			});
		}
	},

	update: async ({ request }) => {
		// TODO check why the isDone arriving here is either null or "on"
		const data = await request.formData();
		await prisma.event.update({
			where: { id: Number(data.get('id')) },
			data: {
				isDone: !!data.get('isDone')
			}
		});
	}
} satisfies Actions;
