import { fail } from '@sveltejs/kit';
import type { CCategory } from '$lib/category/utils';
import { unauthorized } from '$lib/consts';
import prisma from '$lib/prisma';
import type { TTask } from '$lib/task/utils';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw fail(401, { error: unauthorized });
	}

	const [events, categories]: [events: TTask[], categories: CCategory[]] = await Promise.all([
		prisma.task.findMany({
			where: { deleted: null, userId: session.user.userId },
			include: { category: true },
		}),
		prisma.category.findMany({
			where: { deleted: null, userId: session.user.userId },
		}),
	]);

	return { events, categories };
}) satisfies LayoutServerLoad;
