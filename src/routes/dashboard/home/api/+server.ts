import { json, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import { loginRoute } from '$lib/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const event: TTask = await request.json();

	await prisma.task.update({
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
