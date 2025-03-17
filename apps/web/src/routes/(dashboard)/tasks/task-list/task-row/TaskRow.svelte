<script lang="ts">
	import { tailwindColorMap } from '@life/shared/category';
	import type { Task } from '@life/shared/task';
	import { GripVertical } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import interact from 'interactjs';
	import { Settings2Icon } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	import type { Category } from '$lib/category/category.model';
	import type { Goal } from '$lib/goal/goal.model';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { DATE_FR, DATE_FR_SHORT } from '$lib/utils.svelte';

	import { formatTaskDate, HANDLE, hasMoved, startDrag } from './service';

	interface Props {
		task: Task;
		isDraggable: boolean;
		categories: Category[];
	}

	let { task, isDraggable, categories }: Props = $props();

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

		const hasChanged = hasMoved(container, task, currentUser.uid, client);

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
	class="{tailwindColorMap[task.category.color].darkBg}
		flex select-none justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50 sm:touch-none"
>
	<div class="flex gap-3">
		<div class="flex items-center justify-between gap-3 sm:hidden">
			<!--to avoid dragging during scroll on touch devices, it's only possible to drag a task if it's grabbed by the handle-->
			<Icon class="touch-none {HANDLE} size-6" src={GripVertical} />
			<div class="w-10">{formatTaskDate(task, DATE_FR_SHORT)}</div>
			<div class="name w-[calc(100%-64px)]">{task.name}</div>
		</div>
		<div class="hidden gap-3 sm:flex">
			{formatTaskDate(task, DATE_FR)}
			<div class="name">{task.name}</div>
		</div>
	</div>

	<div class="flex items-center gap-x-3">
		<div class="w-12 text-center">{'duration' in task ? task.duration : '-'}</div>
		<TaskFormButton
			class="{tailwindColorMap[task.category.color].hoverBg} {tailwindColorMap[task.category.color]
				.hoverText}
				rounded text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300"
			{categories}
			color="none"
			padding="px-1.5 py-1"
			{task}
		>
			<Settings2Icon class="size-4" />
		</TaskFormButton>
	</div>
</li>

<style>
	/* make the test truncate in two lines */
	.name {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
