<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { tailwindColorMap } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { CalendarClock, CalendarDays } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Props {
		task: Task;
		index: number;
	}

	let { task, index }: Props = $props();
</script>

<li class="{tailwindColorMap[task.category.color].hoverLightBg} hover:underline">
	<div class="flex w-full items-center px-6 py-3 text-left">
		<span class="w-8 pr-3 font-medium text-gray-500">{index + 1}</span>
		<Icon
			class="h-5 w-8 pr-3 {tailwindColorMap[task.category.color].lightText}"
			src={isUntimed(task) ? CalendarDays : CalendarClock}
			theme="solid"
		/>
		<span class="flex-1 truncate pr-3 font-medium text-gray-500" class:line-through={task.isDone}>
			{task.name}
		</span>

		{#if task.goal?.icon}
			<GoalIcon name={task.goal.icon} class="h-4 w-8 pr-3 text-gray-400" />
		{/if}
		<span class="w-12 text-gray-500">{task.duration}</span>
		<span class="flex w-16 justify-center">
			<span
				class="{task.isDone
					? 'bg-green-50 text-green-700 ring-green-600/20'
					: 'bg-red-50 text-red-700 ring-red-600/20'}
					rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
			>
				{task.isDone ? 'Done' : 'Undone'}
			</span>
		</span>
	</div>
</li>
