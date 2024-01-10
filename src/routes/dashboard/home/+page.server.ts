import { fail } from '@sveltejs/kit';
import { unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { convertToMinutes } from '$lib/task/utils';
import type { TTask } from '$lib/task/utils';
import { parseISO } from 'date-fns';
import type { Actions } from './$types';

export const actions = {
	toggle: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
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
			const data = await request.formData();
			const categoryId = Number(data.get('categoryId'));
			const categoryName = data.get('categoryName') as string;

			const id = Number(data.get('id'));
			const isDone = !!data.get('isDone');
			const name = data.get('name') as string;
			const description = data.get('description') as string;
			const isEvent = !!data.get('isEvent');

			const startDateString = data.get('startDate') as string;
			const endDateString = data.get('endDate') as string;
			const durationString = data.get('duration') as string;

			const isRecurring = !!data.get('isRecurring');
			const recurringStartAtString = data.get('recurringStartAt') as string;
			const recurringEndAtString = data.get('recurringEndAt') as string;
			const recurringDaysOfWeekString = data.get('recurringDaysOfWeek') as string;

			if (!categoryName || !categoryId) {
				throw Error('internal error, please refresh the page');
			}

			const startDate = isEvent ? parseISO(startDateString) : null;
			const endDate = isEvent ? parseISO(endDateString) : null;
			const duration = isEvent ? convertToMinutes(durationString) : null;

			const recurringStartAt = isRecurring ? parseISO(recurringStartAtString) : null;
			const recurringEndAt = isRecurring ? parseISO(recurringEndAtString) : null;
			const recurringDaysOfWeek = isRecurring ? recurringDaysOfWeekString.split(',') : [];

			if (startDate && endDate && startDate > endDate) {
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
						isRecurring,
						recurringStartAt,
						recurringEndAt,
						recurringDaysOfWeek,
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
						isRecurring,
						recurringStartAt,
						recurringEndAt,
						recurringDaysOfWeek,
					},
					include: { category: true },
				});

				return { saved: event };
			}
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
