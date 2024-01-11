import { redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import { loginRoute } from '$lib/consts';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, loginRoute);
	}

	const [tasks, categories]: [tasks: TTask[], categories: CCategory[]] = await Promise.all([
		prisma.task.findMany({
			where: {
				deleted: null,
				userId: session.user.userId,
				// startDate: {
				// 	gte: startOfWeek(new Date()),
				// 	lte: endOfWeek(new Date()),
				// },
			},
			include: { category: true },
		}),
		prisma.category.findMany({
			where: { deleted: null, userId: session.user.userId },
		}),
	]);

	return { tasks, categories };
}) satisfies LayoutServerLoad;
