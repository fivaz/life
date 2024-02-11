<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import classnames from 'classnames';
	import { addMinutes, format } from 'date-fns';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import { moveEvent } from '../../../../service';
	import { GRID_CELL_HEIGHT, GRID_CELL_TIME, isSomethingDragging } from '../calendar-grid/service';
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
		const { date, startTime } = getCellDateTime(panel);

		if (date !== event.date || startTime !== event.startTime) {
			event = moveEvent(event, date, startTime);
			editPossibleSingleRecurringEvent(event, userId, date);
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

	function getDurationFromCellSize(height: number) {
		const timeIntervals = height / GRID_CELL_HEIGHT;
		const timeIntervalRounded = Math.round(timeIntervals);
		const resultDate = addMinutes(new Date(0, 0, 0), timeIntervalRounded * GRID_CELL_TIME);
		return format(resultDate, 'HH:mm');
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

	onMount(() => {
		if (!panel) return;
		interact(panel)
			.resizable({
				edges: {
					bottom: true, // Disable resizing from left edge.
					top: true, // Use pointer coords to check for resize.
				},
				listeners: {
					move: (event) => {
						console.log('event');
						let { x, y } = event.target.dataset;

						x = (parseFloat(x) || 0) + event.deltaRect.left;
						y = (parseFloat(y) || 0) + event.deltaRect.top;

						Object.assign(event.target.style, {
							height: `${event.rect.height}px`,
							transform: `translate(${x}px, ${y}px)`,
							width: `${event.rect.width}px`,
						});

						Object.assign(event.target.dataset, { x, y });
					},
				},
			})
			.on(['resizeend'], (e) => {
				// TODO remove attribute endTime it will be only startTime and duration
				const { startTime } = getCellDateTime(e.currentTarget);
				const duration = getDurationFromCellSize(e.rect.height);
				if (startTime !== event.startTime || duration !== event.duration) {
					event = { ...event, duration, startTime };
					editPossibleSingleRecurringEvent(event, userId, targetDate);
				}
			});
	});
</script>

<div
	bind:this={panel}
	class={classnames(
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none',
		isThisDragging
			? `cursor-grabbing ${tailwindColors[event.category.color].normalBg}`
			: `cursor-grab ${tailwindColors[event.category.color].lightBg} ${tailwindColors[event.category.color].hoverBg}`,
		{ 'py-2': !isShort(event), 'z-10 absolute': isThisDragging },
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].text,
	)}
	role="button"
	style={`transform: translate(${x}px, ${y}px); ${getGridRowsStyle(event)}`}
	tabindex="0"
>
	<PanelCore {event} {targetDate} {userId} />
</div>
