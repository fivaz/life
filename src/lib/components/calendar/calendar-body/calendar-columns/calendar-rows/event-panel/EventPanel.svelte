<script lang="ts">
	import type { AnyEvent, AnyTask, Event } from '$lib/task/utils';

	import {
		GRID_CELL_HEIGHT,
		isSomethingDragging,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import {
		EVENT_PANEL_CLASS,
		type EventsGrid,
		getDivision,
		getHeight,
		getTop,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
	import {
		getCellSizeFromDuration,
		hasMoved,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/service';
	import { clsx } from 'clsx';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import EventPanelCore from './event-panel-core/EventPanelCore.svelte';

	export let event: AnyEvent;
	export let eventsGrid: EventsGrid;

	export let targetDate: string;

	let container: HTMLDivElement | undefined;

	let isSelected = false;

	let position = { x: 0, y: 0 };

	let interactivePanel: ReturnType<typeof interact> | null = null;

	let className = '';
	export { className as class };

	$: {
		interactivePanel?.styleCursor(isSelected);
	}

	const dispatch = createEventDispatcher<{
		editTask: { targetDate: string; task: AnyTask };
		moveEvent: {
			event: Event;
			newDate: string;
			newDuration: string;
			newStartTime: string;
			oldDate: string;
		};
	}>();

	function onMove({ dx, dy, target }: { dx: number; dy: number; target: HTMLElement }) {
		if (!isSelected) return;

		position.x += dx;
		position.y += dy;

		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function startDrag(e: { target: HTMLElement }) {
		if (!isSelected) return;
		isSomethingDragging.set(true);
		Object.assign(e.target.style, {
			touchAction: 'none',
			zIndex: '1',
		});
	}

	function onResize({
		deltaRect,
		rect,
		target,
	}: {
		deltaRect: { left: string; top: string };
		rect: { height: number; width: number };
		target: HTMLElement;
	}) {
		if (!isSelected) return;

		position.x += parseFloat(deltaRect.left);
		position.y += parseFloat(deltaRect.top);

		target.style.width = `${rect.width}px`;
		target.style.height = `${rect.height}px`;
		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function unSelect(e: MouseEvent) {
		if (!container || container.contains(e.target as Node)) return;
		e.preventDefault();

		isSelected = false;
		isSomethingDragging.set(false);
		const hasChanged = hasMoved(container, event);

		if (hasChanged) {
			dispatch('moveEvent', { ...hasChanged, event, oldDate: targetDate });
		} else {
			Object.assign(container.style, {
				backgroundColor: '',
				height: `${getCellSizeFromDuration(event)}px`,
				touchAction: '',
				transform: '',
				zIndex: '',
			});
			position = { x: 0, y: 0 };
		}

		document.removeEventListener('click', unSelect);
	}

	onMount(() => {
		if (!container) return;

		interactivePanel = interact(container);

		interactivePanel.on('click', (e) => {
			//e.target instanceof HTMLInputElement is necessary so when clicking on the checkbox isDone doesn't open the form
			if ($isSomethingDragging || e.target instanceof HTMLInputElement) return;

			dispatch('editTask', { targetDate, task: event });
		});

		interactivePanel.pointerEvents({ holdDuration: 300 }).on('hold', () => {
			isSelected = true;
			isSomethingDragging.set(true);

			document.addEventListener('click', unSelect);
		});

		interactivePanel
			.draggable({ autoScroll: true, listeners: { move: onMove } })
			.on('contextmenu', (e) => e.preventDefault())
			.on('dragstart', startDrag);

		interactivePanel.resizable({
			edges: { bottom: true, top: true },
			listeners: { move: onResize },
			modifiers: [
				interact.modifiers.restrictSize({
					min: { height: GRID_CELL_HEIGHT, width: 100 },
				}),
			],
		});
	});
</script>

<div
	bind:this={container}
	class={clsx(className, EVENT_PANEL_CLASS, 'absolute rounded-lg')}
	style="{getHeight(event)} {getTop(event)} {getDivision(event, eventsGrid)}"
>
	<EventPanelCore {event} {isSelected} on:toggleEvent {targetDate} />
</div>
