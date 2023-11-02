import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { TToDo } from '$lib/to-do/utils';
import { loginRoute } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session?.user) {
		throw redirect(303, loginRoute);
	}

	const toDos: TToDo[] = await prisma.toDo.findMany({
		where: { deleted: null, userId: session.user.id },
	});

	return { toDos };
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) {
			throw redirect(303, loginRoute);
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = data.get('name');

		try {
			if (!name || typeof name !== 'string') {
				throw Error('name is required');
			}

			if (id) {
				const toDo: TToDo = await prisma.toDo.update({
					where: {
						id,
						userId: session.user.id,
					},
					data: {
						name,
					},
				});
				return { saved: toDo };
			} else {
				const toDo: TToDo = await prisma.toDo.create({
					data: {
						userId: session.user.id,
						name,
						isDone: false,
					},
				});
				return { saved: toDo };
			}
		} catch (error) {
			return fail(422, {
				error: error instanceof Error ? error.message : "error isn't an instance of error",
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
		const toDo: TToDo = await prisma.toDo.update({
			where: {
				id,
				userId: session.user.id,
			},
			data: {
				deleted: new Date(),
			},
		});
		return { removed: toDo };
	},
} satisfies Actions;
