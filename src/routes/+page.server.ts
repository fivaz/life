import { redirect } from '@sveltejs/kit';
import { homeRoute } from '$lib/consts';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (session?.user) {
		throw redirect(303, homeRoute);
	}
}) satisfies PageServerLoad;
