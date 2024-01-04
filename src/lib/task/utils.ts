import type { Task } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import prisma from '$lib/prisma';
import { loginRoute, TIME } from '$lib/utils';
import { format, parseISO } from 'date-fns';

export type TTask = Omit<Task, 'deleted' | 'userId'> & {
	category: CCategory;
};

export type OnlyTTask = Omit<TTask, 'category'>;

export type EEvent = Omit<TTask, 'startDate' | 'endDate' | 'duration'> & {
	startDate: Date;
	endDate: Date;
	duration: number;
};

export function convertToMinutes(duration: string) {
	// to check if the duration string is HH:mm format
	if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(duration)) {
		return 0;
	}

	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

export function convertToTime(minutes: number | null): string {
	if (!minutes) {
		return 'unset';
	}
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

export async function saveTask(locals: App.Locals, request: Request) {
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

		const startDate = startDateString ? parseISO(startDateString) : null;
		const endDate = endDateString ? parseISO(endDateString) : null;

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
		console.log('error', error);
		return fail(422, {
			error: error instanceof Error ? error.message : 'unknown error',
		});
	}
}

export async function deleteTask(locals: App.Locals, request: Request) {
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
}
