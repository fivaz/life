import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { OnlyEEvent, Task } from '$lib/task/utils';
import { set } from 'date-fns';

export async function handleError(error: unknown) {
	console.log('error', error);
	return fail(422, {
		error: error instanceof Error ? error.message : 'unknown error',
	});
}

function updateTime(date: Date, time: Date) {
	const hours = time.getHours();
	const minutes = time.getMinutes();

	return set(date, { hours, minutes });
}

export async function splitEventFromRecurring(
	event: OnlyEEvent,
	targetDate: Date,
	userId: string,
): Promise<Task[]> {
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
		include: { category: true, goal: true },
	});

	const recurringEvent = await prisma.task.findFirst({
		where: { id, userId },
	});

	const events: Task[] = [newEvent];

	if (recurringEvent && singleEvent.startDate) {
		const existingEvent = await prisma.task.update({
			where: { id: recurringEvent.id },
			data: { recurringExceptions: [...recurringEvent.recurringExceptions, singleEvent.startDate] },
			include: { category: true, goal: true },
		});

		events.push(existingEvent);
	}

	return events;
}
