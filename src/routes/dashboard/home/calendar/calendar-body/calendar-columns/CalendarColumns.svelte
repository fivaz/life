<script lang="ts">
	import SlimCollection from '$lib/components/slim-collection/SlimCollection.svelte';
	import { parseTasks } from '$lib/task/utils';
	import { addDays } from 'date-fns';
	import { SignedIn } from 'sveltefire';
	import CalendarColumnsDesktop from './calendar-columns-desktop/CalendarColumnsDesktop.svelte';
	import CalendarColumnsMobile from './calendar-columns-mobile/CalendarColumnsMobile.svelte';

	export let weekStart: Date;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
</script>

<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
	<SignedIn let:user>
		<SlimCollection ref={`users/${user.uid}/tasks`} parse={parseTasks} let:data={tasks}>
			<CalendarColumnsDesktop {tasks} {dates} on:edit on:create on:move class="hidden sm:block" />
			<CalendarColumnsMobile {tasks} {dates} on:edit on:create on:move class="block sm:hidden" />
		</SlimCollection>
	</SignedIn>
</div>
