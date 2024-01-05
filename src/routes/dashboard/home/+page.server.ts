import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { convertToMinutes } from '$lib/task/utils';
import type { TTask } from '$lib/task/utils';
import { loginRoute } from '$lib/utils';
import { parseISO } from 'date-fns';
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
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		try {
			const data = await request.formData();
			const id = Number(data.get('id'));
			const isDone = !!data.get('isDone');
			const categoryId = Number(data.get('categoryId'));
			const name = data.get('name') as string;
			const description = data.get('description') as string;
			const startDateString = data.get('startDate') as string;
			const endDateString = data.get('endDate') as string;
			const duration = convertToMinutes(data.get('duration') as string);
			const categoryName = data.get('categoryName') as string;
			const isRecurring = !!data.get('isRecurring');
			const recurringStartAtString = data.get('recurringStartAt') as string;
			const recurringEndAtString = data.get('recurringEndAt') as string;
			const recurringDaysOfWeekString = data.get('recurringDaysOfWeek') as string;

			if (!categoryName || !categoryId) {
				throw Error('internal error, please refresh the page');
			}

			const startDate = parseISO(startDateString);
			const endDate = parseISO(endDateString);

			const recurringStartAt = isRecurring ? parseISO(recurringStartAtString) : null;
			const recurringEndAt = isRecurring ? parseISO(recurringEndAtString) : null;
			const recurringDaysOfWeek = isRecurring ? recurringDaysOfWeekString.split(',') : [];

			if (startDate > endDate) {
				throw Error('startDate should be before endDate');
			}

			if (id) {
				const event: TTask = await prisma.task.update({
					where: {
						id,
						userId: session.user.id,
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
						userId: session.user.id,
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
			console.log(error);
			return fail(422, {
				error: error instanceof Error ? error.message : 'unknown error',
			});
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const event: TTask = await prisma.task.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				deleted: new Date(),
			},
			include: { category: true },
		});
		return { removed: event };
	},
} satisfies Actions;
