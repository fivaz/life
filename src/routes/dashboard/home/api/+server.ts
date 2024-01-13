import { fail, json } from '@sveltejs/kit';
import { unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import { splitEventFromRecurring } from '$lib/server/form-utils';
import type { RequestHandler } from './$types';
import { deserializeEvent } from './service';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw fail(401, { error: unauthorized });
	}

	const serializedEvent = await request.json();

	const { category, ...event } = deserializeEvent(serializedEvent);

	if (event.isRecurring) {
		const events = await splitEventFromRecurring(event, event.startDate, session.user.userId);

		return json(events);
	} else {
		const updatedEvent = await prisma.task.update({
			where: { id: event.id, userId: session.user.userId },
			data: event,
			include: { category: true },
		});

		return json([updatedEvent]);
	}
};
