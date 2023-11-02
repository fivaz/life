import type { Event } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import prisma from '$lib/prisma';
import { loginRoute, TIME } from '$lib/utils';
import { format, isValid, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import type { RouteParams } from '../../../.svelte-kit/types/src/routes/dashboard/$types';

export type EEvent = Omit<Event, 'deleted' | 'userId'> & { category: CCategory };

export type OnlyEEvent = Omit<EEvent, 'category'>;

export function convertToMinutes(duration: string) {
	const [hours, minutes] = duration.split(':').map(Number);
	return hours * 60 + minutes;
}

export function convertToTime(minutes: number): string {
	const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
	return format(date, TIME);
}

export const save = async ({ request, locals }: RequestEvent<RouteParams>) => {
	const session = await locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	try {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const isDone = data.get('isDone') === 'true';
		const categoryId = Number(data.get('categoryId'));
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const startTime = data.get('startTime') as string;
		const endTime = data.get('endTime') as string;
		const duration = convertToMinutes(data.get('duration') as string);
		const date = data.get('date') as string;
		const categoryName = data.get('categoryName') as string;

		if (!categoryName || !categoryId) {
			throw Error('internal error, please refresh the page');
		}

		const startDateString = `${date}T${startTime}:00`;
		const endDateString = `${date}T${endTime}:00`;

		const parsedStartDate = parse(startDateString, "yyyy-MM-dd'T'HH:mm:00", new Date());
		const parsedEndDate = parse(endDateString, "yyyy-MM-dd'T'HH:mm:00", new Date());

		if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
			throw Error('date, startTime and endTime should be valid date and time');
		}

		const startDate = zonedTimeToUtc(`${date}T${startTime}:00`, 'Europe/Zurich');
		const endDate = zonedTimeToUtc(`${date}T${endTime}:00`, 'Europe/Zurich');

		if (startDate > endDate) {
			throw Error('startDate should be before endDate');
		}

		if (id) {
			const event: EEvent = await prisma.event.update({
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
				},
				include: { category: true },
			});
			return { saved: event };
		} else {
			const event: EEvent = await prisma.event.create({
				data: {
					userId: session.user.id,
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
};

export const remove = async ({ request, locals }: RequestEvent<RouteParams>) => {
	const session = await locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const data = await request.formData();
	const id = Number(data.get('id'));
	const event: EEvent = await prisma.event.update({
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
};
