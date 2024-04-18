<script lang="ts">
	import EventsList from '$lib/components/events-list/EventsList.svelte';
	import NewDayViewSide from '$lib/components/new-calendar/new-calendar-body/new-day-view-side/NewDayViewSide.svelte';
	import WeekListMobile from '$lib/components/new-calendar/new-calendar-body/week-list-mobile/WeekListMobile.svelte';
	import HorizontalTime from '$lib/components/new-week-view/new-week-calendar-body/horizontal-time/HorizontalTime.svelte';
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

<div class="isolate flex flex-auto overflow-hidden bg-white">
	<div bind:this={container} class="flex flex-auto flex-col overflow-auto">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
		>
			<WeekListMobile />
		</div>

		<div class="flex w-full flex-auto">
			<div class="w-14 flex-none bg-white ring-1 ring-gray-100" />
			<div class="grid flex-auto grid-cols-1 grid-rows-1">
				<!--{/* Horizontal lines */}-->
				<HorizontalTime>
					<div bind:this={containerOffset} />
				</HorizontalTime>

				<!--{/* Events * /}-->
				<EventsList />
			</div>
		</div>
	</div>

	<NewDayViewSide />
</div>
