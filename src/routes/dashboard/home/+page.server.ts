import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { deleteTask, saveTask } from '$lib/task/utils';
import type { TTask } from '$lib/task/utils';
import { loginRoute } from '$lib/utils';
import type { Actions } from './$types';

export const actions = {
	toggle: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const isDone = !!data.get('isDone');
		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				isDone,
			},
			include: { category: true },
		});

		return { saved: event };
	},
	save: async ({ request, locals }) => {
		return await saveTask(locals, request);
	},
	remove: async ({ request, locals }) => {
		return await deleteTask(locals, request);
	},
} satisfies Actions;
