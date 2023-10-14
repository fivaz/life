import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// 1.
	const response = await prisma.event.findMany();

	// 2.
	return { events: response };
}) satisfies PageServerLoad;
