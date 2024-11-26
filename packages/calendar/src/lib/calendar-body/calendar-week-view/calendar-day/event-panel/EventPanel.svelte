<script lang="ts">
	import type { Task } from '@life/lib/task';
	import { clsx } from 'clsx';
	import interact from 'interactjs';
	import { onMount } from 'svelte';

	import { getEditTask, getMoveEvent } from '$lib/context.utils.js';

	import { GRID_CELL_HEIGHT, isSomethingDragging } from '../calendar-grid/service.svelte.js';
	import EventPanelCore from './event-panel-core/EventPanelCore.svelte';
	import type { EventsGrid } from './placement-service.js';
	import { EVENT_PANEL_CLASS, getDivision, getHeight, getTop } from './placement-service.js';
	import { getCellSizeFromDuration, hasMoved } from './service.js';

	interface Props {
		event: Task;
		eventsGrid: EventsGrid;
		targetDate: string;
		class?: string;
	}

	let { event, eventsGrid, targetDate, class: klass = '' }: Props = $props();

	let container = $state<HTMLDivElement | undefined>();

	let isSelected = $state<boolean>(false);

	let position = $state({ x: 0, y: 0 });

	let interactivePanel: ReturnType<typeof interact> | null = $state(null);

	$effect(() => {
		interactivePanel?.styleCursor(isSelected);
	});

	const editTask = getEditTask();

	const moveEvent = getMoveEvent();

	function onMove({ dx, dy, target }: { dx: number; dy: number; target: HTMLElement }) {
		if (!isSelected) return;

		position.x += dx;
		position.y += dy;

		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function startDrag(e: { target: HTMLElement }) {
		if (!isSelected) return;
		isSomethingDragging.value = true;
		Object.assign(e.target.style, {
			touchAction: 'none',
			zIndex: '1'
		});
	}

	function onResize({
		deltaRect,
		rect,
		target
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
		isSomethingDragging.value = false;
		const hasChanged = hasMoved(container, event);

		if (hasChanged) {
			moveEvent(event, { ...hasChanged, oldDate: targetDate });
		} else {
			Object.assign(container.style, {
				backgroundColor: '',
				height: `${getCellSizeFromDuration(event)}px`,
				touchAction: '',
				transform: '',
				zIndex: ''
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
			if (isSomethingDragging.value || e.target instanceof HTMLInputElement) return;

			editTask(event, targetDate);
		});

		interactivePanel.pointerEvents({ holdDuration: 300 }).on('hold', () => {
			isSelected = true;
			isSomethingDragging.value = true;

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
					min: { height: GRID_CELL_HEIGHT, width: 100 }
				})
			]
		});
	});
</script>

<div
	bind:this={container}
	style="{getHeight(event)} {getTop(event)} {getDivision(event, eventsGrid)}"
	class={clsx(klass, EVENT_PANEL_CLASS, 'absolute rounded-lg')}
>
	<EventPanelCore {event} {isSelected} {targetDate} />
</div>
