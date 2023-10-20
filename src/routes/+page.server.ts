import { redirect } from '@sveltejs/kit';
import { dashboardRoute } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (session?.user) {
		throw redirect(303, dashboardRoute);
	}
}) satisfies PageServerLoad;
