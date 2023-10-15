import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.event.findMany();

	return { events: response };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const description = data.get('description');
		const startDate = data.get('startDate');
		const endDate = data.get('endDate');
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

			return await prisma.event.create({
				data: {
					name,
					description,
					startDate: new Date(startDate),
					endDate: new Date(endDate),
					isDone: false
				}
			});
		} catch (error) {
			return fail(422, {
				name,
				description,
				date: data.get('date'),
				startTime: data.get('startTime'),
				endTime: data.get('endTime'),
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
