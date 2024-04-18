<script lang="ts">
	import HorizontalTime from '$lib/components/new-week-view/new-week-calendar-body/horizontal-time/HorizontalTime.svelte';
	import NewWeekList from '$lib/components/new-week-view/new-week-calendar-body/new-week-list/NewWeekList.svelte';
	import WeekEventList from '$lib/components/new-week-view/new-week-calendar-body/week-event-list/WeekEventList.svelte';
	import { onMount } from 'svelte';

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
</script>

<div bind:this={container} class="isolate flex flex-auto flex-col overflow-auto bg-white">
	<div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full" style="width: 165%">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
		>
			<NewWeekList />
		</div>
		<div class="flex flex-auto">
			<div class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
			<div class="grid flex-auto grid-cols-1 grid-rows-1">
				<!--{/* Horizontal lines */}-->
				<HorizontalTime>
					<div bind:this={containerOffset}></div>
				</HorizontalTime>

				<!--{/* Vertical lines */}-->
				<div
					class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7"
				>
					<div class="col-start-1 row-span-full" />
					<div class="col-start-2 row-span-full" />
					<div class="col-start-3 row-span-full" />
					<div class="col-start-4 row-span-full" />
					<div class="col-start-5 row-span-full" />
					<div class="col-start-6 row-span-full" />
					<div class="col-start-7 row-span-full" />
					<div class="col-start-8 row-span-full w-8" />
				</div>

				<!--{/* Events */}-->
				<WeekEventList />
			</div>
		</div>
	</div>
</div>
