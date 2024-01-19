import { fail } from '@sveltejs/kit';
import { unauthorized } from '$lib/consts';
import type { GGoal, GoalWithTasks } from '$lib/goal/utils';
import prisma from '$lib/prisma';
import { handleError } from '$lib/server/form-utils';
import { parseISO } from 'date-fns';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw fail(401, { error: unauthorized });
	}

	const goals: GoalWithTasks[] = await prisma.goal.findMany({
		where: { deleted: null, userId: session.user.userId },
		include: { tasks: true },
	});

	return { goals };
}) satisfies PageServerLoad;

async function getGoal(request: Request): Promise<GGoal> {
	const data = await request.formData();
	const id = Number(data.get('id'));
	const name = data.get('name') as string;
	const deadlineString = data.get('deadline') as string;
	const isDone = !!data.get('isDone');

	const deadline = parseISO(deadlineString);

	return {
		id,
		name,
		isDone,
		deadline,
	};
}

export const actions = {
	save: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw fail(401, { error: unauthorized });
		}

		const { id, ...goalData } = await getGoal(request);

		try {
			let goal: GoalWithTasks;

			if (!id) {
				goal = await prisma.goal.create({
					data: { ...goalData, userId: session.user.userId },
					include: { tasks: true },
				});
			} else {
				goal = await prisma.goal.update({
					where: { id, userId: session.user.userId },
					data: goalData,
					include: { tasks: true },
				});
			}
			return { saved: goal };
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

			const goal: GoalWithTasks = await prisma.goal.update({
				where: {
					id,
					userId: session.user.userId,
				},
				data: {
					deleted: new Date(),
				},
				include: { tasks: true },
			});

			return { removed: goal };
		} catch (error) {
			return handleError(error);
		}
	},
} satisfies Actions;
