import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	// 1.
	const response = await prisma.event.findMany();

	// 2.
	return { events: response };
}) satisfies PageServerLoad;

export const actions = {
	// 2.
	update: async ({ request }) => {
		console.log('here');
		const data = await request.formData();
		console.log('isDOne', data.get('isDone'));
		console.log('id', Number(data.get('id')));
		await prisma.event.update({
			where: { id: Number(data.get('id')) },
			data: {
				isDone: !!data.get('isDone')
			}
		});
	}
} satisfies Actions;
