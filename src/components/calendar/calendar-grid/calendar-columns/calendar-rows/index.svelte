<script lang="ts">
	import type { TEvent } from '$lib';
	import { format, parseISO } from 'date-fns';

	export let events: TEvent[];

	let eventsData: (TEvent & { start: number; end: number })[] = [];

	$: eventsData = events.map((event) => ({
		...event,
		...getGridRows(event)
	}));

	function getGridRows(event: TEvent): { start: number; end: number } {
		// Parse the start and end dates
		const start = new Date(event.startTime);
		const end = new Date(event.endTime);

		// Calculate the number of 15-minute intervals from midnight for the start and end times
		const startRow = start.getHours() * 4 + Math.floor(start.getMinutes() / 15) + 1;
		const endRow = end.getHours() * 4 + Math.ceil(end.getMinutes() / 15) + 1;

		// Return the grid-row-start and grid-row-end values
		return {
			start: startRow,
			end: endRow
		};
	}

	const halfHourInterval = 24 * 2;
	const quarterHourInterval = halfHourInterval * 2;
</script>

<!--TODO make top and side sticky-->

<div class="relative h-full">
	<!--	grid division of hours-->
	<div
		class="h-full grid divide-y"
		style="grid-template-rows: repeat({halfHourInterval}, minmax(3.5rem, 1fr))"
	>
		{#each Array.from({ length: halfHourInterval }, (_, i) => i) as halfHour (halfHour)}
			<div />
		{/each}
	</div>
	<ol
		class="h-full absolute top-0 w-full grid"
		style="grid-template-rows: repeat({quarterHourInterval}, minmax(1.75rem, 1fr)) auto"
	>
		{#each eventsData as event (event)}
			<li class="relative rounded-lg z-10" style="grid-row: {event.start} / {event.end};">
				<div
					class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
				>
					<p class="order-1 font-semibold text-blue-700">{event.label}</p>
					{#if event.description}
						<p class="order-1 text-pink-500 group-hover:text-pink-700">
							{event.description}
						</p>
					{/if}
					<p class="text-blue-500 group-hover:text-blue-700">
						<time dateTime="2022-01-22T06:00">{format(parseISO(event.startTime), 'p')}</time>
					</p>
				</div>
			</li>
		{/each}
	</ol>
</div>
