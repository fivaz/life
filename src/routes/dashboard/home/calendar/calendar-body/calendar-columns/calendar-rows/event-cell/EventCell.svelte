<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import { TIME } from '$lib/consts';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import { moveEvent } from '../../../../service';
	import { isSomethingDragging } from '../calendar-grid/service';
	import { getGridRowsStyle } from '../service';
	import EventName from './event-name/EventName.svelte';
	import { getCellDateTime, isShort, toggleCompletion } from './service';

	export let userId: string;

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: string;

	let draggedElement: HTMLDivElement | undefined = undefined;
	let startX = 0;
	let startY = 0;
	let x = 0;
	let y = 0;

	let isThisDragging = false;
	let clickTimer: ReturnType<typeof setTimeout>;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

	function startDrag(event: MouseEvent | TouchEvent) {
		clickTimer = setTimeout(() => {
			isThisDragging = true;
			isSomethingDragging.set(true);
		}, 100);

		const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];
		startX = clientX - x;
		startY = clientY - y;
	}

	function drag(event: MouseEvent | TouchEvent) {
		if (isThisDragging && draggedElement) {
			const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];
			x = clientX - startX;
			y = clientY - startY;
		}
	}

	function click() {
		dispatch('edit', { event, targetDate });
	}

	function endDrap() {
		if (isThisDragging && draggedElement) {
			const dateTime = getCellDateTime(draggedElement);

			if (dateTime) {
				event = moveEvent(event, dateTime.date, dateTime.time);
				const { id, ...data } = event;
				editPossibleSingleRecurringEvent(id, data, userId, dateTime.date);
			}
		}
		stopDrag();
	}

	function stopDrag() {
		setTimeout(() => {
			x = 0;
			y = 0;
		}, 50);
		isThisDragging = false;
		isSomethingDragging.set(false);
	}

	function mouseUp() {
		if (isThisDragging) {
			endDrap();
		} else {
			click();
		}
		clearTimeout(clickTimer);
	}
</script>

<div
	bind:this={draggedElement}
	class={classnames(
		'w-full h-full rounded-lg pointer-events-auto min-w-0',
		'select-none absolute',
		isThisDragging ? 'cursor-grabbing' : 'cursor-grab',
		{ 'py-2': !isShort(event), 'z-10': isThisDragging },
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
		tailwindColors[event.category.color].text,
	)}
	on:mousedown={startDrag}
	on:mousemove={drag}
	on:mouseup={mouseUp}
	on:touchend={mouseUp}
	on:touchmove={drag}
	on:touchstart={startDrag}
	role="button"
	style={`transform: translate(${x}px, ${y}px); ${getGridRowsStyle(event)}`}
	tabindex="0"
>
	<div class="relative">
		<div class="absolute right-0 pr-2">
			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				on:change={() => toggleCompletion(userId, event, targetDate)}
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
