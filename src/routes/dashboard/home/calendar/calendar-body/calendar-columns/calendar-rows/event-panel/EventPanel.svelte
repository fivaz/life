<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import classnames from 'classnames';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	import { isSomethingDragging } from '../calendar-grid/service';
	import { getGridRowsStyle } from '../service';
	import PanelCore from './panel-core/PanelCore.svelte';
	import { isShort, persistChange } from './service';

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
		if (!panel || panel.contains(e.target as Node)) return;
		console.log('unSelect');
		e.preventDefault();

		isSelected = false;
		isSomethingDragging.set(false);
		const hasChanged = persistChange(panel, event, userId, targetDate);

		if (!hasChanged) {
			Object.assign(panel.style, {
				backgroundColor: '',
				touchAction: '',
				transform: '',
				zIndex: '',
			});
		}
		document.removeEventListener('click', unSelect);
	}

	onMount(() => {
		if (!panel) return;

		interactivePanel = interact(panel);

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
</script>

<div
	bind:this={panel}
	class={classnames(
		{ 'py-2': !isShort(event) },
		'w-full h-full rounded-lg pointer-events-auto min-w-0 select-none box-border',
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
