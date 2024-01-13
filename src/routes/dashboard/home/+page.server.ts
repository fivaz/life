import { fail, redirect } from '@sveltejs/kit';
import { loginRoute, unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { handleError } from '$lib/server/form-utils';
import { getTask } from '$lib/task/utils';
import type { OnlyEEvent, OnlyTTask, TTask } from '$lib/task/utils';
import { parseISO, set } from 'date-fns';
import type { Actions } from './$types';

function updateTime(date: Date, time: Date) {
	const hours = time.getHours();
	const minutes = time.getMinutes();

	return set(date, { hours, minutes });
}

async function splitEventFromRecurring(
	event: OnlyEEvent,
	targetDate: Date,
	userId: string,
): Promise<TTask[]> {
	// remove id from event
	const { id, ...eventData } = event;

	const singleEvent = {
		...eventData,
		startDate: updateTime(targetDate, event.startDate),
		endDate: updateTime(targetDate, event.endDate),
		isRecurring: false,
		recurringStartAt: null,
		recurringEndAt: null,
		recurringDaysOfWeek: [],
		recurringExceptions: [],
	};

	const newEvent = await prisma.task.create({
		data: { ...singleEvent, userId },
		include: { category: true },
	});

	const recurringEvent = await prisma.task.findFirst({
		where: { id, userId },
	});

	const events: TTask[] = [newEvent];

	if (recurringEvent && singleEvent.startDate) {
		const existingEvent = await prisma.task.update({
			where: { id: recurringEvent.id },
			data: { recurringExceptions: [...recurringEvent.recurringExceptions, singleEvent.startDate] },
			include: { category: true },
		});

		events.push(existingEvent);
	}

	return events;
}

export const actions = {
	toggle: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw redirect(302, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const isDone = !!data.get('isDone');
		const targetDate = parseISO(data.get('targetDate') as string);

		const foundEvent: OnlyTTask | null = await prisma.task.findFirst({ where: { id } });

		if (foundEvent?.isRecurring) {
			foundEvent.isDone = isDone;
			const events = await splitEventFromRecurring(
				foundEvent as OnlyEEvent,
				targetDate,
				session.user.userId,
			);
			return { updated: events };
		}

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

		return { updated: [event] };
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

			const event = await prisma.task.create({
				data: { ...taskData, userId: session.user.userId },
				include: { category: true },
			});
			return { created: event };
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
			const { isForThisEventOnly, targetDate, task } = await getTask(request);

			if (isForThisEventOnly && targetDate) {
				const events = await splitEventFromRecurring(
					task as OnlyEEvent,
					targetDate,
					session.user.userId,
				);

				return { updated: events };
			} else {
				const event = await prisma.task.update({
					where: { id: task.id, userId: session.user.userId },
					data: task,
					include: { category: true },
				});

				return { updated: [event] };
			}
		} catch (error) {
			return handleError(error);
		}
	},
	remove: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		try {
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
		} catch (error) {
			return handleError(error);
		}
	},
} satisfies Actions;
