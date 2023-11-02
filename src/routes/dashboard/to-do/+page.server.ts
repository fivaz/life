import { fail, redirect } from '@sveltejs/kit';
import type { EEvent } from '$lib/event/utils';
import { convertToMinutes } from '$lib/event/utils';
import prisma from '$lib/prisma';
import { loginRoute } from '$lib/utils';
import { add, addMinutes, isValid, parse, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
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
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const startDate = new Date(data.get('startDate') as string);
		const duration = Number(data.get('duration'));

		const tomorrowDate = getTomorrowDate(startDate);

		const event: EEvent = await prisma.event.update({
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
	},
	remove: async ({ request, locals }) => {
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
	},
} satisfies Actions;
