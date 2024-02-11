<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { editPossibleSingleRecurringEvent } from '$lib/components/task-form/service';
	import classnames from 'classnames';
	import { addMinutes, format } from 'date-fns';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

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

	let position = { x: 0, y: 0 };

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
				hold: 500,
				listeners: {
					move(e) {
						position.x += e.dx;
						position.y += e.dy;

						Object.assign(e.target.style, {
							transform: `translate(${position.x}px, ${position.y}px)`,
							zIndex: '1',
						});
					},
				},
			})
			.on('contextmenu', (e) => {
				e.preventDefault();
			})
			.on('dragstart', (e) => {
				isSomethingDragging.set(true);
				e.target.style.backgroundColor = tailwindColors[event.category.color].normalBgCss;
			})
			.on('dragend', (e) => {
				isSomethingDragging.set(false);
				e.target.style.backgroundColor = '';

				const dateTime = getCellDateTime(e.target);
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
					move: (e) => {
						console.log('event');
						let { x, y } = e.target.dataset;

						x = (parseFloat(x) || 0) + e.deltaRect.left;
						y = (parseFloat(y) || 0) + e.deltaRect.top;

						Object.assign(e.target.style, {
							height: `${e.rect.height}px`,
							transform: `translate(${x}px, ${y}px)`,
							width: `${e.rect.width}px`,
						});

						Object.assign(e.target.dataset, { x, y });
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
		{ 'py-2': !isShort(event) },
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none touch-none',
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].text,
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
	)}
	style={getGridRowsStyle(event)}
>
	<PanelCore {event} {targetDate} {userId} />
</div>
