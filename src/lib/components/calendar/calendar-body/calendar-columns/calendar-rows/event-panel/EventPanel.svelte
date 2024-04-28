<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { isSomethingDragging } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import {
		EVENT_PANEL_CLASS,
		getDivision,
		getHeight,
		getTop,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/placement-service';
	import { hasMoved } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/service';
	import { clsx } from 'clsx';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import EventPanelCore from './event-panel-core/EventPanelCore.svelte';

	export let event: AnyEvent;

	export let targetDate: string;
	export let timeSlots: string[][];

	let container: HTMLDivElement | undefined = undefined;

	let isSelected = false;

	let position = { x: 0, y: 0 };

	let interactivePanel: ReturnType<typeof interact> | null = null;

	let className = '';
	export { className as class };

	$: {
		interactivePanel?.styleCursor(isSelected);
	}

	const dispatch = createEventDispatcher<{
		editTask: { event: Event; targetDate: string };
		moveEvent: {
			event: Event;
			newDate: string;
			newDuration: string;
			newStartTime: string;
			oldDate: string;
		};
	}>();

	function startDrag(e: { target: HTMLElement }) {
		if (!isSelected) return;
		isSomethingDragging.set(true);
		Object.assign(e.target.style, {
			backgroundColor: tailwindColors[event.category.color].normalBgCss,
			touchAction: 'none',
			zIndex: '1',
		});
	}

	function onMove(e: { dx: number; dy: number; target: HTMLElement }) {
		if (!isSelected) return;
		position.x += e.dx;
		position.y += e.dy;

		e.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
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
				touchAction: '',
				transform: '',
				zIndex: '',
			});
		}

		position = { x: 0, y: 0 };

		document.removeEventListener('click', unSelect);
	}

	onMount(() => {
		if (!container) return;

		interactivePanel = interact(container);

		interactivePanel.on('tap', (e) => {
			//e.target instanceof HTMLInputElement is necessary so when clicking on the checkbox isDone doesn't open the form
			if ($isSomethingDragging || e.target instanceof HTMLInputElement) return;

			dispatch('editTask', { event, targetDate });
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
			listeners: { move: resizeEvent },
		});
	});
</script>

<div
	bind:this={container}
	class={clsx(className, EVENT_PANEL_CLASS, 'absolute rounded-lg')}
	style="{getHeight(event)} {getTop(event)} {getDivision(timeSlots, event)}"
>
	<EventPanelCore {event} {isSelected} on:toggleEvent {targetDate} />
</div>
