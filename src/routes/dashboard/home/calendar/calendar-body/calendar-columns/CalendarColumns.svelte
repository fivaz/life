<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import type { AnyTask } from '$lib/task/utils';
	import { addDays } from 'date-fns';
	import { collectionStore, userStore } from 'sveltefire';
	import CalendarColumnsDesktop from './calendar-columns-desktop/CalendarColumnsDesktop.svelte';
	import CalendarColumnsMobile from './calendar-columns-mobile/CalendarColumnsMobile.svelte';

	export let weekStart: Date;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	const user = userStore(auth);

	let tasks;
	if ($user) {
		tasks = collectionStore<AnyTask & { ref: unknown }[]>(db, `users/${$user.uid}/tasks`);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function defaultParse(rawData: any[]): any[] {
		return rawData.map((rawDatum) => {
			const { ref, ...datum } = rawDatum;
			return datum;
		});
	}
</script>

<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
	{#if $tasks}
		<CalendarColumnsDesktop
			tasks={defaultParse($tasks)}
			{dates}
			on:edit
			on:create
			on:move
			class="hidden sm:block"
		/>
		<CalendarColumnsMobile
			tasks={$tasks}
			{dates}
			on:edit
			on:create
			on:move
			class="block sm:hidden"
		/>
	{/if}
</div>
