<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import classnames from 'classnames';
	import { addMinutes, format } from 'date-fns';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import { GRID_CELL_HEIGHT, GRID_CELL_TIME } from '../calendar-grid/service';
	import { getGridRowsStyle } from '../service';
	import PanelCore from './panel-core/PanelCore.svelte';
	import { getCellDateTime, isShort } from './service';

	export let userId: string;

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: string;

	let panel: HTMLDivElement | undefined = undefined;

	let position = { x: 0, y: 0 };

	let isThisDragging = false;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

	function getDurationFromCellSize(height: number) {
		const timeIntervals = height / GRID_CELL_HEIGHT;
		const timeIntervalRounded = Math.round(timeIntervals);
		const resultDate = addMinutes(new Date(0, 0, 0), timeIntervalRounded * GRID_CELL_TIME);
		return format(resultDate, 'HH:mm');
	}

	onMount(() => {
		if (!panel) return;

		interact(panel).on('tap', () => {
			dispatch('edit', { event, targetDate });
		});

		interact(panel)
			.draggable({
				listeners: {
					move(event) {
						position.x += event.dx;
						position.y += event.dy;
						Object.assign(event.target.style, {
							transform: `translate(${position.x}px, ${position.y}px)`,
							zIndex: '1',
						});
					},
				},
			})
			.on('dragend', (e) => {
				const dateTime = getCellDateTime(e.currentTarget);
				if (!dateTime || (dateTime.startTime === event.startTime && dateTime.date === event.date))
					return;

				event = { ...event, date: dateTime.date, startTime: dateTime.startTime };
				editPossibleSingleRecurringEvent(event, userId, dateTime.date);
			});

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
			.on('resizeend', (e) => {
				// TODO remove attribute endTime it will be only startTime and duration
				const dateTime = getCellDateTime(e.currentTarget);
				const duration = getDurationFromCellSize(e.rect.height);
				if (!dateTime || (dateTime.startTime === event.startTime && duration === event.duration))
					return;
				event = { ...event, duration, startTime: dateTime.startTime };
				editPossibleSingleRecurringEvent(event, userId, targetDate);
			});
	});
</script>

<div
	bind:this={panel}
	class={classnames(
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none touch-none',
		isThisDragging
			? `cursor-grabbing ${tailwindColors[event.category.color].normalBg}`
			: `cursor-grab ${tailwindColors[event.category.color].lightBg} ${tailwindColors[event.category.color].hoverBg}`,
		{ 'py-2': !isShort(event), 'z-10 absolute': isThisDragging },
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].text,
	)}
	role="button"
	style={getGridRowsStyle(event)}
	tabindex="0"
>
	<PanelCore {event} {targetDate} {userId} />
</div>
