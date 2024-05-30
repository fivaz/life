<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { isSomethingDragging } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { DATE_FR, DATE_FR_SHORT } from '$lib/consts';
	import { getTaskDate } from '$lib/task/time-utils';
	import { Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'date-fns';
	import interact from 'interactjs';
	import { createEventDispatcher, onMount } from 'svelte';

	export let task: AnyTask;

	let dispatch = createEventDispatcher<{ edit: AnyTask; rescheduleToTomorrow: AnyTask }>();

	function formatDate(task: AnyTask, dateFormat: string) {
		const date = getTaskDate(task);
		return date ? format(date, dateFormat) : '';
	}

	let container: HTMLLIElement | undefined;

	let interactiveContainer: ReturnType<typeof interact> | null = null;

	let position = { x: 0, y: 0 };

	function onMove({ dx, dy, target }: { dx: number; dy: number; target: HTMLElement }) {
		position.x += dx;
		position.y += dy;

		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function startDrag(e: { target: HTMLElement }) {
		isSomethingDragging.set(true);
		Object.assign(e.target.style, {
			touchAction: 'none',
			zIndex: '1',
		});
	}

	onMount(() => {
		if (!container) return;

		interactiveContainer = interact(container);

		interactiveContainer
			.draggable({ autoScroll: true, listeners: { move: onMove } })
			.on('contextmenu', (e) => e.preventDefault())
			.on('dragstart', startDrag);
	});
</script>

<li
	bind:this={container}
	class="{tailwindColors[task.category.color].darkBg}
		flex select-none justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50"
>
	<div class="flex items-center justify-between gap-x-3">
		<div class="hidden sm:block">{formatDate(task, DATE_FR)}</div>
		<div class="block sm:hidden">{formatDate(task, DATE_FR_SHORT)}</div>
		<div class="name">{task.name}</div>
	</div>

	<div class="flex items-center gap-x-3">
		<div class="w-12 text-center">{'duration' in task ? task.duration : '-'}</div>
		<button
			class="{tailwindColors[task.category.color].hoverBg} {tailwindColors[task.category.color]
				.hoverText}
				rounded px-1.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
			on:click={() => dispatch('edit', task)}
			type="button"
		>
			<Icon class="h-4 w-4 text-white" src={Settings2} />
		</button>
	</div>
</li>

<style>
	.name {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
