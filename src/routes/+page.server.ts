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
		try {
			const name = data.get('name');
			const date = data.get('date');
			const startTime = data.get('startTime');
			const endTime = data.get('endTime');
			const description = data.get('description');

			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (typeof description !== 'string') {
				throw Error('description must be a string');
			}

			if (!date) {
				throw Error('date is required');
			}

			if (!startTime) {
				throw Error('startTime is required');
			}

			if (!endTime) {
				throw Error('endTime is required');
			}

			const startDate = new Date(`${date}T${startTime}:00`);
			const endDate = new Date(`${date}T${endTime}:00`);

			return await prisma.event.create({
				data: {
					name,
					description,
					startDate,
					endDate,
					isDone: false
				}
			});
		} catch (error) {
			return fail(422, {
				name: data.get('name'),
				description: data.get('description'),
				date: data.get('date'),
				startTime: data.get('startTime'),
				endTime: data.get('endTime'),
				isDone: data.get('isDone'),
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
