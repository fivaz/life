<script lang="ts">
	import { GripVertical, Settings2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import interact from 'interactjs';
	import { onDestroy, onMount } from 'svelte';

	import { tailwindColors } from '$lib/category/category.utils';
	import { DATE_FR, DATE_FR_SHORT } from '$lib/date.utils.svelte';
	import type { Task } from '$lib/task/task.model';

	import { formatDate, HANDLE, hasMoved, startDrag } from './service';

	interface Props {
		task: Task;
		userId: string;
		isDraggable: boolean;
		edit: (task: Task) => void;
	}

	let { task, userId, isDraggable, edit }: Props = $props();

	let container = $state<HTMLLIElement | null>(null);

	let interactiveContainer: ReturnType<typeof interact> | null = null;

	let position = { x: 0, y: 0 };

	function onMove({ dx, dy, target }: { dx: number; dy: number; target: HTMLElement }) {
		position.x += dx;
		position.y += dy;

		target.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function endDrag({ client }: { client: { x: number; y: number } }) {
		if (!container) return;

		const hasChanged = hasMoved(container, task, userId, client);

		if (!hasChanged) {
			Object.assign(container.style, {
				backgroundColor: '',
				touchAction: '',
				transform: '',
				zIndex: '',
			});
			position = { x: 0, y: 0 };
		}
	}

	let isSmallScreen: boolean;
	// 640px is sm- breakpoint from tailwind
	const breakpoint = 640;

	function updateScreenSize() {
		isSmallScreen = window.innerWidth < breakpoint;
	}

	onMount(() => {
		if (!container || !isDraggable) return;
		updateScreenSize();
		window.addEventListener('resize', updateScreenSize);

		interactiveContainer = interact(container);

		interactiveContainer
			.draggable({
				...(isSmallScreen && { allowFrom: `.${HANDLE}` }),
				autoScroll: true,
				listeners: { move: onMove },
			})
			.on('contextmenu', (e) => e.preventDefault())
			.on('dragstart', startDrag)
			.on('dragend', endDrag);
	});

	onDestroy(() => window.removeEventListener('resize', updateScreenSize));
</script>

<li
	bind:this={container}
	class="{tailwindColors[task.category.color].darkBg}
		flex select-none justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50 sm:touch-none"
>
	<div class="flex gap-3">
		<div class="flex items-center justify-between gap-3 sm:hidden">
			<!--to avoid dragging during scroll on touch devices, it's only possible to drag a task if it's grabbed by the handle-->
			<Icon class="touch-none {HANDLE} h-6 w-6" src={GripVertical} />
			<div class="w-10">{formatDate(task, DATE_FR_SHORT)}</div>
			<div class="name w-[calc(100%-64px)]">{task.name}</div>
		</div>
		<div class="hidden gap-3 sm:flex">
			{formatDate(task, DATE_FR)}
			<div class="name">{task.name}</div>
		</div>
	</div>

	<div class="flex items-center gap-x-3">
		<div class="w-12 text-center">{'duration' in task ? task.duration : '-'}</div>
		<button
			class="{tailwindColors[task.category.color].hoverBg} {tailwindColors[task.category.color]
				.hoverText}
				rounded px-1.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
			onclick={() => edit(task)}
			type="button"
		>
			<Icon class="h-4 w-4 text-white" src={Settings2} />
		</button>
	</div>
</li>

<style>
	.name {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
