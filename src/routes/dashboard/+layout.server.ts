import { redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import { loginRoute } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const [events, categories]: [events: TTask[], categories: CCategory[]] = await Promise.all([
		prisma.task.findMany({
			where: { deleted: null, userId: session.user.id },
			include: { category: true },
		}),
		prisma.category.findMany({
			where: { deleted: null, userId: session.user.id },
		}),
	]);

	return { events, categories };
}) satisfies LayoutServerLoad;
