<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import { TIME } from '$lib/consts';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import { moveEvent } from '../../../../service';
	import { getGridRowsStyle } from '../service';
	import EventName from './event-name/EventName.svelte';
	import { isShort, toggleCompletion } from './service';

	export let userId: string;

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: string;

	let draggedElement: HTMLDivElement | null = null;

	let dragging = false;
	let startX = 0;
	let startY = 0;
	let x = 0;
	let y = 0;

	let loading = false;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

	function startDrag(event: MouseEvent) {
		dragging = true;
		startX = event.clientX - x;
		startY = event.clientY - y;
	}

	function drag(event: MouseEvent) {
		if (dragging && draggedElement) {
			x = event.clientX - startX;
			y = event.clientY - startY;
		}
	}

	function getCellDateTime(draggedElement: HTMLDivElement): { date: string; time: string } | void {
		const yPoint = draggedElement.getBoundingClientRect().top + 28 / 2;
		const xPoint =
			draggedElement.getBoundingClientRect().left -
			(draggedElement.getBoundingClientRect().left - draggedElement.getBoundingClientRect().right) /
				2;

		draggedElement.style.visibility = 'hidden';
		const timeTab = document.elementFromPoint(xPoint, yPoint);
		draggedElement.style.visibility = '';

		if (timeTab && timeTab instanceof HTMLElement) {
			const date = timeTab.dataset['date'];
			const time = timeTab.dataset['time'];
			if (date && time) {
				return { date, time };
			}
		}
	}

	function endDrag() {
		if (dragging && draggedElement) {
			const dateTime = getCellDateTime(draggedElement);
			if (dateTime) {
				const { id, ...data } = moveEvent(event, dateTime.date, dateTime.time);
				editPossibleSingleRecurringEvent(id, data, userId, dateTime.date);
			}
		}
		stopDrag();
		dragging = false;
	}

	function stopDrag() {
		x = 0;
		y = 0;
	}
</script>

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
	on:click={() => dispatch('edit', { event, targetDate })}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('edit', { event, targetDate });
		}
	}}
	on:mousedown={startDrag}
	on:mouseleave={endDrag}
	on:mousemove={drag}
	on:mouseup={endDrag}
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

<Loading class={classnames('h-4 w-4', tailwindColors[event.category.color].text)} {loading} />
