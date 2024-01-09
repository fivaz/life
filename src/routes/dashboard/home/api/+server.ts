import { fail, json } from '@sveltejs/kit';
import { unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw fail(401, { error: unauthorized });
	}

	const event: TTask = await request.json();

	await prisma.task.update({
		where: {
			id: event.id,
			userId: session.user.userId,
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
