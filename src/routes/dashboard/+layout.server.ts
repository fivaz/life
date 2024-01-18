import { redirect } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import { loginRoute } from '$lib/consts';
import type { GGoal } from '$lib/goal/utils';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, loginRoute);
	}

	const [tasks, categories, goals]: [tasks: TTask[], categories: CCategory[], goals: GGoal[]] =
		await Promise.all([
			prisma.task.findMany({
				where: {
					deleted: null,
					userId: session.user.userId,
					// startDate: {
					// 	gte: startOfWeek(new Date()),
					// 	lte: endOfWeek(new Date()),
					// },
				},
				include: { category: true, goal: true },
			}),
			prisma.category.findMany({
				where: { deleted: null, userId: session.user.userId },
			}),
			prisma.goal.findMany({
				where: { deleted: null, userId: session.user.userId },
			}),
		]);

	return { tasks, categories, goals };
}) satisfies LayoutServerLoad;
