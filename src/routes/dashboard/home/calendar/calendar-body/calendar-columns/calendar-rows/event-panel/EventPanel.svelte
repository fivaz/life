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

	let isSelected = false;

	let position = { x: 0, y: 0 };

	let interactivePanel: ReturnType<typeof interact> | null = null;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

	$: {
		interactivePanel?.styleCursor(isSelected);
	}

	function getDurationFromCellSize(height: number) {
		const timeIntervals = height / GRID_CELL_HEIGHT;
		const timeIntervalRounded = Math.round(timeIntervals);
		const resultDate = addMinutes(new Date(0, 0, 0), timeIntervalRounded * GRID_CELL_TIME);
		return format(resultDate, 'HH:mm');
	}

	function startDrag(e: { target: HTMLElement }) {
		if (!isSelected) return;
		isSomethingDragging.set(true);
		e.target.style.backgroundColor = tailwindColors[event.category.color].normalBgCss;
	}

	function onMove(e: { dx: number; dy: number; target: HTMLElement }) {
		if (!isSelected) return;
		position.x += e.dx;
		position.y += e.dy;

		Object.assign(e.target.style, {
			touchAction: 'none',
			transform: `translate(${position.x}px, ${position.y}px)`,
			zIndex: '1',
		});
	}

	function dragEnd(e: { target: HTMLDivElement }) {
		if (!isSelected) return;
		isSomethingDragging.set(false);
		e.target.style.backgroundColor = '';

		const dateTime = getCellDateTime(e.target);
		if (!dateTime || (dateTime.startTime === event.startTime && dateTime.date === event.date))
			return;

		event = { ...event, date: dateTime.date, startTime: dateTime.startTime };
		editPossibleSingleRecurringEvent(event, userId, dateTime.date);
		isSelected = false;
	}

	function resizeEvent(e: {
		deltaRect: { left: string; top: string };
		rect: { height: number; width: number };
		target: HTMLElement;
	}) {
		if (!isSelected) return;
		let { x, y } = e.target.dataset;

		x = (parseFloat(x || '0') || 0) + e.deltaRect.left;
		y = (parseFloat(y || '0') || 0) + e.deltaRect.top;

		Object.assign(e.target.style, {
			height: `${e.rect.height}px`,
			transform: `translate(${x}px, ${y}px)`,
			width: `${e.rect.width}px`,
		});

		Object.assign(e.target.dataset, { x, y });
	}

	function persisteNewSize(e: { rect: { height: number }; target: HTMLDivElement }) {
		const dateTime = getCellDateTime(e.target);
		const duration = getDurationFromCellSize(e.rect.height);
		if (!dateTime || (dateTime.startTime === event.startTime && duration === event.duration))
			return;
		event = { ...event, duration, startTime: dateTime.startTime };
		editPossibleSingleRecurringEvent(event, userId, targetDate);
	}

	function unSelect(e: MouseEvent) {
		if (!panel || panel.contains(e.target as Node)) return;
		isSelected = false;
		isSomethingDragging.set(false);
		document.removeEventListener('click', unSelect);
	}

	onMount(() => {
		if (!panel) return;

		interactivePanel = interact(panel);

		interactivePanel.on('tap', () => {
			if (!$isSomethingDragging) {
				dispatch('edit', { event, targetDate });
			}
		});

		interactivePanel.on('hold', () => {
			isSelected = true;
			isSomethingDragging.set(true);

			document.addEventListener('click', unSelect);
		});

		interactivePanel
			.draggable({ listeners: { move: onMove } })
			.on('contextmenu', (e) => e.preventDefault())
			.on('dragstart', startDrag)
			.on('dragend', dragEnd);

		interactivePanel
			.resizable({
				edges: { bottom: true, top: true },
				listeners: { move: resizeEvent },
			})
			.on('resizeend', persisteNewSize);
	});
</script>

<div
	bind:this={panel}
	class={classnames(
		{ 'py-2': !isShort(event) },
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none',
		'group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].text,
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
		{ 'border border-1 border-black touch-none': isSelected },
	)}
	style={getGridRowsStyle(event)}
>
	<PanelCore {event} {targetDate} {userId} />
</div>