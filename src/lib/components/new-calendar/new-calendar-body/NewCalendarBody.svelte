<script lang="ts">
	import NewDayViewSide from '$lib/components/new-calendar/new-calendar-body/new-day-view-side/NewDayViewSide.svelte';
	import NewTimeLabs from '$lib/components/new-calendar/new-calendar-body/new-time-labs/NewTimeLabs.svelte';
	import WeekListMobile from '$lib/components/new-calendar/new-calendar-body/week-list-mobile/WeekListMobile.svelte';
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
				<NewTimeLabs {containerOffset}>
					<div bind:this={containerOffset} />
				</NewTimeLabs>

				<!--{/* Events * /}-->
				<ol
					class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
					style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
				>
					<li class="relative mt-px flex" style="grid-row: 74 / span 12">
						<button
							class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
						>
							<p class="order-1 font-semibold text-blue-700">Breakfast</p>
							<p class="text-blue-500 group-hover:text-blue-700">
								<time dateTime="2022-01-22T06:00">6:00 AM</time>
							</p>
						</button>
					</li>
					<li class="relative mt-px flex" style="grid-row: 92 / span 30">
						<button
							class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
						>
							<p class="order-1 font-semibold text-pink-700">Flight to Paris</p>
							<p class="order-1 text-pink-500 group-hover:text-pink-700">
								John F. Kennedy International Airport
							</p>
							<p class="text-pink-500 group-hover:text-pink-700">
								<time dateTime="2022-01-22T07:30">7:30 AM</time>
							</p>
						</button>
					</li>
					<li class="relative mt-px flex" style="grid-row: 134 / span 18">
						<button
							class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
						>
							<p class="order-1 font-semibold text-indigo-700">Sightseeing</p>
							<p class="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
							<p class="text-indigo-500 group-hover:text-indigo-700">
								<time dateTime="2022-01-22T11:00">11:00 AM</time>
							</p>
						</button>
					</li>
				</ol>
			</div>
		</div>
	</div>

	<NewDayViewSide />
</div>
