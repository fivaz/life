import { fail } from '@sveltejs/kit';
import { unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import { convertToMinutes } from '$lib/task/utils';
import { add, addMinutes, parseISO, set } from 'date-fns';
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
			throw fail(401, { error: unauthorized });
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
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
			const data = await request.formData();
			const id = Number(data.get('id'));
			const isDone = data.get('isDone') === 'true';
			const categoryId = Number(data.get('categoryId'));
			const name = data.get('name') as string;
			const description = data.get('description') as string;
			const startDateString = data.get('startDate') as string;
			const endDateString = data.get('endDate') as string;

			const duration = convertToMinutes(data.get('duration') as string);

			const categoryName = data.get('categoryName') as string;

			if (!categoryName || !categoryId) {
				throw Error('internal error, please refresh the page');
			}

			const startDate = parseISO(startDateString);
			const endDate = parseISO(endDateString);

			if (startDate > endDate) {
				throw Error('startDate should be before endDate');
			}

			if (id) {
				const event: TTask = await prisma.task.update({
					where: {
						id,
						userId: session.user.userId,
					},
					data: {
						name: name || categoryName,
						description,
						startDate,
						endDate,
						duration,
						isDone,
						categoryId,
					},
					include: { category: true },
				});
				return { saved: event };
			} else {
				const event: TTask = await prisma.task.create({
					data: {
						userId: session.user.userId,
						name: name || categoryName,
						description,
						startDate,
						endDate,
						duration,
						isDone,
						categoryId,
					},
					include: { category: true },
				});
				return { saved: event };
			}
		} catch (error) {
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
