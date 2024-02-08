<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { TIME } from '$lib/consts';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';

	import { getGridRowsStyle } from '../service';
	import EventName from './event-name/EventName.svelte';
	import { dragEnd, dragStart, isShort, toggleCompletion } from './service';

	export let container: HTMLDivElement | undefined;

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: Date;

	let draggedElement: HTMLDivElement | null = null;

	let dragging = false;
	let startX = 0;
	let startY = 0;
	let x = 0;
	let y = 0;

	let loading = false;

	const cellSize = 50;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: Date } }>();

	function calculateCellPosition() {
		const cellX = Math.floor(x / cellSize);
		const cellY = Math.floor(y / cellSize);
		return { cellX, cellY };
	}

	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		startX = event.clientX - x;
		startY = event.clientY - y;
	}

	function handleMouseMove(event: MouseEvent) {
		if (dragging && draggedElement) {
			x = event.clientX - startX;
			y = event.clientY - startY;

			// console.log(event.clientX);
			// console.log(event.clientY);

			// Calculate the cell position while dragging
			// const { cellX, cellY } = calculateCellPosition();
			// console.log(`Element is in cell (${cellX}, ${cellY})`);
		}
	}

	function roundToNearest15Minutes(minutes: number) {
		return Math.round(minutes / 15) * 15;
	}

	function updateEventTime(draggedEvent: HTMLDivElement, timeTab: HTMLDivElement) {
		// Get the height of the time tab
		const timeTabHeight = timeTab.clientHeight;

		// Get the top position of the dragged event relative to the time tab
		const eventTop = draggedEvent.getBoundingClientRect().top - timeTab.getBoundingClientRect().top;

		// Calculate the percentage of the day based on the event's position
		const percentageOfDay = (eventTop / timeTabHeight) * 100;

		// Calculate the time in minutes
		const totalMinutes = Math.round((percentageOfDay * 24 * 60) / 100);

		// Round to the nearest 15 minutes interval
		const roundedMinutes = roundToNearest15Minutes(totalMinutes);

		// Convert total minutes to hours and minutes
		const hours = Math.floor(roundedMinutes / 60);
		const minutes = roundedMinutes % 60;

		// Update your event with the calculated time
		console.log(`Event placed at ${hours}:${minutes}`);
	}

	function handleMouseUp(event: MouseEvent) {
		if (!dragging || !draggedElement || !container) {
			return;
		}
		updateEventTime(draggedElement, container);
		dragging = false;
	}
</script>

<!--getBoundingClientRect-->
<SignedIn let:user>
	<div
		bind:this={draggedElement}
		class={classnames(
			'w-full h-full rounded-lg pointer-events-auto min-w-0',
			'cursor-grab select-none absolute',
			{ 'py-2': !isShort(event), 'z-10': dragging },
			'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
			tailwindColors[event.category.color].text,
		)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				dispatch('edit', { event, targetDate });
			}
		}}
		on:mousedown={handleMouseDown}
		on:mouseleave={handleMouseUp}
		on:mousemove={handleMouseMove}
		on:mouseup={handleMouseUp}
		role="button"
		style={`transform: translate(${x}px, ${y}px); ${getGridRowsStyle(event)}`}
		tabindex="0"
	>
		<div class="relative">
			<div class="absolute right-0 pr-2">
				<input
					checked={event.isDone}
					class="rounded border-gray-300 focus:ring-indigo-600"
					disabled={loading}
					on:change={() => toggleCompletion(user.uid, event, targetDate)}
					on:click|stopPropagation
					type="checkbox"
				/>
			</div>
			<p class={classnames({ hidden: isShort(event) }, 'text-blue-500 group-hover:text-blue-700')}>
				<time dateTime={`${event.date} ${event.startTime}`}>
					{format(parse(event.startTime, TIME, new Date()), 'p')}
				</time>
			</p>

			<EventName {event} />

			<p
				class={classnames(
					{ hidden: isShort(event) || !event.description },
					'text-pink-500 group-hover:text-pink-700',
				)}
			>
				{event.description}
			</p>
		</div>
	</div>
</SignedIn>

<Loading class={classnames('h-4 w-4', tailwindColors[event.category.color].text)} {loading} />
