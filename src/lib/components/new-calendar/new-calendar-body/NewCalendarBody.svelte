<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarColumns from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/NewCalendarColumns.svelte';
	import NewHorizontalTime from '$lib/components/new-calendar/new-calendar-body/new-horizontal-time/NewHorizontalTime.svelte';
	import NewWeekList from '$lib/components/new-calendar/new-calendar-body/new-week-list/NewWeekList.svelte';
	import { addDays } from 'date-fns';
	import { onMount } from 'svelte';

	export let weekStart: Date;
	export let events: AnyEvent[];

	let container: HTMLDivElement | null = null;
	let containerNav: HTMLDivElement | null = null;
	let containerOffset: HTMLDivElement | null = null;

	onMount(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		if (!container || !containerNav || !containerOffset) {
			return;
		}

		container.scrollTop =
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
			1440;
	});

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
</script>

<div bind:this={container} class="isolate flex flex-auto flex-col overflow-auto bg-white">
	<div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
		>
			<NewWeekList {dates} />
		</div>

		<div class="flex w-full h-full">
			<NewHorizontalTime>
				<div bind:this={containerOffset} />
			</NewHorizontalTime>
			<NewCalendarColumns {dates} {events} />
		</div>
	</div>
</div>
