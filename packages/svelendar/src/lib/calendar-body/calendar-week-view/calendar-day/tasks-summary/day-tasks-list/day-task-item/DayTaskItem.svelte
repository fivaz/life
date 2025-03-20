<script lang="ts">
	import { DoneChip, GoalIcon, LText } from '@life/shared';
	import { tailwindColorMap } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { CalendarClockIcon, CalendarDaysIcon } from 'lucide-svelte';

	import { getEditTask } from '$lib/context.utils.js';

	interface Props {
		task: Task;
		date: Date;
		index: number;
	}

	const editTask = getEditTask();

	let { task, date, index }: Props = $props();
</script>

<li class="{tailwindColorMap[task.category.color].hoverLightBg} group hover:underline">
	<button
		class="flex w-full items-center px-6 py-3 text-left"
		onclick={() => editTask(task, formatDate(date))}
	>
		<div class="flex flex-1 items-center gap-2 truncate">
			<LText
				class="w-5 font-medium {tailwindColorMap[task.category.color].hoverText}"
				level="middle"
			>
				{index + 1}
			</LText>
			{#if isUntimed(task)}
				<CalendarDaysIcon class="size-5 {tailwindColorMap[task.category.color].lightText}" />
			{:else}
				<CalendarClockIcon class="size-5 {tailwindColorMap[task.category.color].lightText}" />
			{/if}
			<LText
				class={clsx(
					tailwindColorMap[task.category.color].hoverText,
					{ 'line-trough': task.isDone },
					'flex-1 truncate pr-3 font-medium',
				)}
			>
				{task.name}
			</LText>
		</div>

		<div class="flex items-center gap-2">
			{#if task.goal?.icon}
				<LText>
					<GoalIcon
						name={task.goal.icon}
						class="size-5 {tailwindColorMap[task.category.color].hoverText}"
					/>
				</LText>
			{/if}
			<LText class={tailwindColorMap[task.category.color].hoverText}>{task.duration}</LText>
			<DoneChip isDone={task.isDone} />
		</div>
	</button>
</li>
