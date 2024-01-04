import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import { deleteTask, saveTask } from '$lib/task/utils';
import { loginRoute } from '$lib/utils';
import { add, addMinutes, set } from 'date-fns';
import type { Actions } from './$types';

function getTomorrowDate(date: Date): Date {
	const tomorrow = add(new Date(), { days: 1 });

	// Reschedule the task to be tomorrow at the same time
	return set(date, {
		year: tomorrow.getFullYear(),
		month: tomorrow.getMonth(),
		date: tomorrow.getDate(),
	});
}

export const actions = {
	rescheduleToTomorrow: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const startDate = new Date(data.get('startDate') as string);
		const duration = Number(data.get('duration'));

		const tomorrowDate = getTomorrowDate(startDate);

		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				startDate: tomorrowDate,
				endDate: addMinutes(tomorrowDate, duration),
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
