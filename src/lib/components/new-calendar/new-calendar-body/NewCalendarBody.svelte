<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarColumns from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/NewCalendarColumns.svelte';
	import NewHorizontalTime from '$lib/components/new-calendar/new-calendar-body/new-horizontal-time/NewHorizontalTime.svelte';
	import NewWeekList from '$lib/components/new-calendar/new-calendar-body/new-week-list/NewWeekList.svelte';
	import { addDays } from 'date-fns';
	
export let weekStart: Date;
	export let events: AnyEvent[];

	let container: HTMLDivElement | null = null;
	let containerNav: HTMLDivElement | null = null;
	let containerOffset: HTMLDivElement | null = null;

	// onMount(() => {
	// 	// Set the container scroll position based on the current time.
	// 	const currentMinute = new Date().getHours() * 60;
	// 	if (!container || !containerNav || !containerOffset) {
	// 		return;
	// 	}
	//
	// 	container.scrollTop =
	// 		((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
	// 			currentMinute) /
	// 		1440;
	// });

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
</script>

<div bind:this={container} class="isolate flex flex-auto flex-col overflow-auto bg-white">
	<div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full" style="width: 165%">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
		>
			<NewWeekList {dates} />
		</div>

		<div class="flex w-full h-full">
			<NewHorizontalTime />
			<NewCalendarColumns {dates} {events} />
		</div>
		<!--		<div class="flex flex-auto">-->
		<!--			<div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />-->
		<!--			<div class="grid flex-auto grid-cols-1 grid-rows-1">-->
		<!--				&lt;!&ndash;{/* Horizontal lines */}&ndash;&gt;-->
		<!--				<HorizontalTime>-->
		<!--					<div bind:this={containerOffset}></div>-->
		<!--				</HorizontalTime>-->

		<!--				&lt;!&ndash;{/* Vertical lines */}&ndash;&gt;-->
		<!--				&lt;!&ndash;				<div&ndash;&gt;-->
		<!--				&lt;!&ndash;					class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7"&ndash;&gt;-->
		<!--				&lt;!&ndash;				>&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-1 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-2 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-3 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-4 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-5 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-6 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-7 row-span-full" />&ndash;&gt;-->
		<!--				&lt;!&ndash;					<div class="col-start-8 row-span-full w-8" />&ndash;&gt;-->
		<!--				&lt;!&ndash;				</div>&ndash;&gt;-->

		<!--				&lt;!&ndash;{/* Events */}&ndash;&gt;-->
		<!--				&lt;!&ndash;				<WeekEventList />&ndash;&gt;-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</div>
