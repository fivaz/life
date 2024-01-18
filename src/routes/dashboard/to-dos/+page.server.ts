import { fail, redirect } from '@sveltejs/kit';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { handleError } from '$lib/server/form-utils';
import { getTask } from '$lib/task/utils';
import type { TTask } from '$lib/task/utils';
import { add, addMinutes, set } from 'date-fns';
import type { Actions } from './$types';

function getTomorrowDate(date: Date): Date {
	const tomorrow = add(new Date(), { days: 1 });

	// Reschedule the event to be tomorrow at the same time
	return set(date, {
		year: tomorrow.getFullYear(),
		month: tomorrow.getMonth(),
		date: tomorrow.getDate(),
	});
}

export const actions = {
	rescheduleToTomorrow: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw redirect(302, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const startDate = new Date(data.get('startDate') as string);
		const duration = Number(data.get('duration'));

		const tomorrowDate = getTomorrowDate(startDate);

		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.userId,
			},
			data: {
				startDate: tomorrowDate,
				endDate: addMinutes(tomorrowDate, duration),
			},
			include: { category: true },
		});
		return { saved: event };
	},
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const {
				task: { id, ...taskData },
			} = await getTask(request);

			const task = await prisma.task.create({
				data: { ...taskData, userId: session.user.userId },
				include: { category: true },
			});
			return { created: task };
		} catch (error) {
			return handleError(error);
		}
	},
	update: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const { task } = await getTask(request);

			const updatedTask: TTask = await prisma.task.update({
				where: { id: task.id, userId: session.user.userId },
				data: task,
				include: { category: true },
			});

			return { updated: [updatedTask] };
		} catch (error) {
			return handleError(error);
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		const data = await request.formData();
		const id = Number(data.get('id'));

		const task: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.userId,
			},
			data: {
				deleted: new Date(),
			},
			include: { category: true },
		});
		return { removed: task };
	},
} satisfies Actions;
