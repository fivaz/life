<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	import { moveEvent } from '../../../../service';
	import { isSomethingDragging } from '../calendar-grid/service';
	import { getGridRowsStyle } from '../service';
	import PanelCore from './panel-core/PanelCore.svelte';
	import { getCellDateTime, isShort } from './service';

	export let userId: string;

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: string;

	let panel: HTMLDivElement | undefined = undefined;

	let startX = 0;
	let startY = 0;
	let x = 0;
	let y = 0;

	let hasTouchMoved = false;
	let isThisDragging = false;
	let clickTimer: ReturnType<typeof setTimeout>;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

	function mouseDown(event: MouseEvent | TouchEvent) {
		clickTimer = setTimeout(() => {
			startDrag(event);
		}, 500);
	}

	function startDrag(event: MouseEvent | TouchEvent) {
		isThisDragging = true;
		isSomethingDragging.set(true);

		const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];
		startX = clientX - x;
		startY = clientY - y;

		document.addEventListener('mousemove', drag);
		document.addEventListener('touchmove', drag);
	}

	function drag(event: MouseEvent | TouchEvent) {
		const { clientX, clientY } = event instanceof MouseEvent ? event : event.touches[0];
		x = clientX - startX;
		y = clientY - startY;
	}

	function endDrap() {
		if (!panel) return;
		const dateTime = getCellDateTime(panel);
		if (!dateTime) return;

		if (dateTime.date !== event.date || dateTime.time !== event.startTime) {
			event = moveEvent(event, dateTime.date, dateTime.time);
			editPossibleSingleRecurringEvent(event, userId, dateTime.date);
		}
		stopDrag();
	}

	function stopDrag() {
		setTimeout(() => {
			x = 0;
			y = 0;
		}, 100);
		isThisDragging = false;
		hasTouchMoved = false;
		isSomethingDragging.set(false);
	}

	function click() {
		dispatch('edit', { event, targetDate });
	}

	function mouseUp(event: MouseEvent | TouchEvent) {
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('touchmove', drag);

		if (isThisDragging) {
			endDrap();
		} else {
			if (event instanceof MouseEvent || !hasTouchMoved) {
				click();
			}
		}

		clearTimeout(clickTimer);
	}
</script>

<div
	bind:this={panel}
	class={classnames(
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none',
		isThisDragging ? `cursor-grabbing` : `cursor-grab`,
		{ 'py-2': !isShort(event), 'z-10 absolute': isThisDragging },
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
		tailwindColors[event.category.color].text,
	)}
	on:mousedown={mouseDown}
	on:mouseup={mouseUp}
	on:touchend={mouseUp}
	on:touchmove={() => (hasTouchMoved = true)}
	on:touchstart={mouseDown}
	role="button"
	style={`transform: translate(${x}px, ${y}px); ${getGridRowsStyle(event)}`}
	tabindex="0"
>
	<PanelCore {event} {targetDate} {userId} />
</div>
