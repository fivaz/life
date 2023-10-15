<script lang="ts">
	import type { TEvent } from '$lib';
	import classnames from 'classnames';
	import { format, differenceInMinutes } from 'date-fns';

	export let events: TEvent[];

	let eventsData: (TEvent & { start: number; end: number })[] = [];

	$: eventsData = events.map((event) => ({
		...event,
		...getGridRows(event)
	}));

	function getGridRows(event: TEvent): { start: number; end: number } {
		// Calculate the number of 15-minute intervals from midnight for the start and end times
		const startRow =
			event.startDate.getHours() * 4 + Math.floor(event.startDate.getMinutes() / 15) + 1;
		const endRow = event.endDate.getHours() * 4 + Math.ceil(event.endDate.getMinutes() / 15) + 1;

		// Return the grid-row-start and grid-row-end values
		return {
			start: startRow,
			end: endRow
		};
	}

	function isShort(event: TEvent) {
		const diff = differenceInMinutes(event.startDate, event.endDate);
		return Math.abs(diff) <= 15;
	}

	const halfHourInterval = 24 * 2;
	const quarterHourInterval = halfHourInterval * 2;
</script>

<!--TODO make top and side sticky-->
<!--TODO handle event that takes more than 1 day-->

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
			<li
				class="relative w-full h-full rounded-lg z-10"
				style="grid-row: {event.start} / {event.end};"
			>
				<div
					class={classnames(
						{ 'py-2': !isShort(event) },
						'group absolute w-full h-full flex flex-col overflow-y-auto rounded-lg bg-blue-50 py-1 px-2 text-xs leading-5 hover:bg-blue-100'
					)}
				>
					<p
						class={classnames(
							{ hidden: isShort(event) },
							'text-blue-500 group-hover:text-blue-700'
						)}
					>
						<time dateTime="2022-01-22T06:00">{format(event.startDate, 'p')}</time>
					</p>
					<p class="font-semibold text-blue-700">{event.name}</p>
					<p
						class={classnames(
							{ hidden: isShort(event) || !event.description },
							'text-pink-500 group-hover:text-pink-700'
						)}
					>
						{event.description}
					</p>
				</div>
			</li>
		{/each}
	</ol>
</div>
