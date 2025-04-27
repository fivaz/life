<script lang="ts">
	import { tailwindColorMap } from '@life/shared/category';
	import type { Task } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { format } from 'date-fns';
	import { GripVerticalIcon, Settings2Icon } from 'lucide-svelte';
	import { dragHandle } from 'svelte-dnd-action';

	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { DATE_FR, DATE_FR_SHORT } from '$lib/utils.svelte';

	interface Props {
		task: Task;
	}

	let { task }: Props = $props();

	export function formatTaskDate(task: Task, dateFormat: string) {
		if (!task.date) {
			return '';
		}

		return format(task.date, dateFormat);
	}
</script>

<div
	class="{tailwindColorMap[task.category.color].darkBg}
		flex select-none items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50 sm:touch-none"
>
	<div class="flex gap-3">
		<div class="flex items-center justify-between gap-3 sm:hidden">
			<!--to avoid dragging during scroll on touch devices, it's only possible to drag a task if it's grabbed by the handle-->
			<div aria-label="drag-handle for {task.id}" use:dragHandle>
				<GripVerticalIcon class="size-5" />
			</div>
			<div class={clsx({ 'w-10': task.date })}>{formatTaskDate(task, DATE_FR_SHORT)}</div>
			<div class={clsx('name', { 'w-[calc(100%-64px)]': task.date })}>{task.name}</div>
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
			color="none"
			padding="px-1.5 py-1"
			{task}
		>
			<Settings2Icon class="size-4" />
		</TaskFormButton>
	</div>
</div>

<style>
	/* make the text truncate in two lines */
	.name {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
