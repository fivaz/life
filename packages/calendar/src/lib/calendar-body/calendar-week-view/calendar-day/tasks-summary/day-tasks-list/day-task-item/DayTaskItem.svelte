<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { CalendarClock, CalendarDays } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { getEditTask } from '$lib/context.utils.js';

	interface Props {
		task: Task;
		date: Date;
		index: number;
	}

	const editTask = getEditTask();

	let { task, date, index }: Props = $props();
</script>

<li class="hover:bg-gray-100 hover:underline">
	<button
		class="flex w-full items-center px-6 py-3 text-left"
		onclick={() => editTask(task, formatDate(date))}
	>
		<span class="w-5 pr-3 font-medium text-gray-500">{index + 1}</span>
		<Icon
			class="h-5 w-8 pr-3 text-gray-400"
			src={isUntimed(task) ? CalendarDays : CalendarClock}
			theme="solid"
		/>
		<span class="flex-1 truncate pr-3 font-medium text-gray-500" class:line-through={task.isDone}>
			{task.name}
		</span>

		{#if task.goal?.icon}
			<GoalIcon name={task.goal.icon} class="h-4 w-8 pr-3 text-gray-400" />
		{/if}
		<span class="w-12">{task.duration}</span>
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
	</button>
</li>
