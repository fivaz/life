<script lang="ts">
	import type { TEvent } from '$lib';
	import classnames from 'classnames';

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

	function getRandomColorClass() {
		const colors = [
			'bg-blue-50',
			'bg-pink-50',
			'bg-yellow-50',
			'bg-green-50',
			'bg-purple-50',
			'bg-red-50',
			'bg-indigo-50'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	const hourInterval = 24;
	const minutesInterval = (hourInterval * 60) / 15;
</script>

<div class="relative h-full">
	<!--	grid division of hours-->
	<div class="h-full grid" style="grid-template-rows: repeat({hourInterval}, minmax(3.5rem, 1fr))">
		{#each Array.from({ length: hourInterval }, (_, i) => i) as hour (hour)}
			<div />
		{/each}
	</div>
	<div
		class="h-full absolute top-0 w-full grid"
		style="grid-template-rows: 0.875rem repeat({minutesInterval}, minmax(0, 1fr)) auto"
	>
		{#each eventsData as event (event)}
			<div
				class={classnames(getRandomColorClass(), 'rounded-lg z-10')}
				style="grid-row: {event.start} / {event.end};"
			>
				{event.label}
			</div>
		{/each}
	</div>
</div>
