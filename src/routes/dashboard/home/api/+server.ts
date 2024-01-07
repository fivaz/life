import { json, redirect } from '@sveltejs/kit';
import { loginRoute } from '$lib/consts';
import type { EEvent } from '$lib/event/utils';
import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const event: EEvent = await request.json();

	await prisma.event.update({
		where: {
			id: event.id,
			userId: session.user.id,
		},
		data: {
			name: event.name,
			description: event.description,
			categoryId: event.category.id,
			startDate: event.startDate,
			endDate: event.endDate,
			isDone: event.isDone,
		},
	});

	return json({ status: 201 });
};
