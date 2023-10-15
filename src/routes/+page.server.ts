import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.event.findMany();

	return { events: response };
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request }) => {
		try {
			const data = await request.formData();

			const startDate = new Date(`${data.get('date')}T${data.get('startTime')}:00`);
			const endDate = new Date(`${data.get('date')}T${data.get('endTime')}:00`);

			const name = data.get('name');
			const description = data.get('description');
			const isDone = !!data.get('isDone');

			if (!name || typeof name !== 'string') {
				throw 'name is required';
			}

			if (typeof description !== 'string') {
				throw 'description must be a string';
			}

			await prisma.event.create({
				data: {
					name,
					description,
					startDate,
					endDate,
					isDone
				}
			});
		} catch (error) {
			return fail(422, {
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
