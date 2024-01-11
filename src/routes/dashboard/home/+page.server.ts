import { fail, redirect } from '@sveltejs/kit';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { getTask } from '$lib/task/utils';
import type { TTask } from '$lib/task/utils';
import type { Actions } from './$types';

export const actions = {
	toggle: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw redirect(302, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const isDone = !!data.get('isDone');
		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.userId,
			},
			data: {
				isDone,
			},
			include: { category: true },
		});

		return { saved: event };
	},
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const { id, isForThisEventOnly, ...task } = await getTask(request);

			let savedTask: TTask;
			if (id) {
				if (isForThisEventOnly) {
					savedTask = await prisma.task.create({
						data: { ...task, copyOf: id, userId: session.user.userId },
						include: { category: true },
					});
				} else {
					savedTask = await prisma.task.update({
						where: { id, userId: session.user.userId },
						data: task,
						include: { category: true },
					});
				}
			} else {
				savedTask = await prisma.task.create({
					data: { ...task, userId: session.user.userId },
					include: { category: true },
				});
			}

			return { saved: savedTask };
		} catch (error) {
			console.log('error', error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.userId,
			},
			data: {
				deleted: new Date(),
			},
			include: { category: true },
		});
		return { removed: event };
	},
} satisfies Actions;
