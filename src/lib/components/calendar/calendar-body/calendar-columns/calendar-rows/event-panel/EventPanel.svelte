<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import {
		GRID_CELL_TIME,
		NEW_GRID_CELL_HEIGHT,
		isSomethingDragging,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { persistChange } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/event-panel/service';
	import { convertTimeToMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import EventPanelCore from './event-panel-core/EventPanelCore.svelte';

	export let event: AnyEvent;

	export let userId: string;

	export let targetDate: string;

	let container: HTMLDivElement | undefined = undefined;

	let isSelected = false;

	let position = { x: 0, y: 0 };

	let interactivePanel: ReturnType<typeof interact> | null = null;

	$: {
		interactivePanel?.styleCursor(isSelected);
	}

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: string } }>();

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
		const hasChanged = persistChange(container, event, userId, targetDate);

		if (!hasChanged) {
			Object.assign(container.style, {
				backgroundColor: '',
				touchAction: '',
				transform: '',
				zIndex: '',
			});
		}
		document.removeEventListener('click', unSelect);
	}

	onMount(() => {
		if (!container) return;

		interactivePanel = interact(container);

		interactivePanel.on('tap', (e) => {
			//e.target instanceof HTMLInputElement is necessary so when clicking on the checkbox isDone doesn't open the form
			if ($isSomethingDragging || e.target instanceof HTMLInputElement) return;

			dispatch('edit', { event, targetDate });
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

	function getTop() {
		const startTimeMinutes = convertTimeToMinutes(event.startTime);
		return `${(startTimeMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px`;
	}

	function getHeight() {
		const durationMinutes = convertTimeToMinutes(event.duration);

		return `${(durationMinutes / GRID_CELL_TIME) * NEW_GRID_CELL_HEIGHT}px`;
	}
</script>

<div
	bind:this={container}
	class={clsx('absolute w-full rounded-lg')}
	style="height: {getHeight()}; top: {getTop()}"
>
	<EventPanelCore {event} {isSelected} {targetDate} {userId} />
</div>
