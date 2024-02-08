<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { addDays } from 'date-fns';
	import { SignedIn } from 'sveltefire';

	import CalendarColumnsDesktop from './calendar-columns-desktop/CalendarColumnsDesktop.svelte';
	import CalendarColumnsMobile from './calendar-columns-mobile/CalendarColumnsMobile.svelte';

	export let weekStart: Date;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	let taskType: AnyTask;
</script>

<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
	<SignedIn let:user>
		<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
			<CalendarColumnsDesktop class="hidden sm:block" {dates} on:create on:edit {tasks} />
			<CalendarColumnsMobile class="block sm:hidden" {dates} on:create on:edit {tasks} />
		</TypedCollection>
	</SignedIn>
</div>
