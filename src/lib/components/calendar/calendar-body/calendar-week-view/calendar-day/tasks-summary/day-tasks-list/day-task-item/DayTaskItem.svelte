<script lang="ts">
	import { CalendarClock, CalendarDays } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { getContext } from 'svelte';

	import { formatDate } from '$lib/date.utils.svelte.js';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import { type CalendarTask, isUntimed } from '$lib/task/task.model';

	interface Props {
		task: CalendarTask;
		date: Date;
		index: number;
	}

	const editTask = getContext('editTask');

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
		<span
			class={clsx(
				{ 'line-through': task.isDone },
				'flex-1 truncate pr-3 font-medium text-gray-500',
			)}
		>
			{task.name}
		</span>

		{#if task.goal?.icon}
			<GoalIcon name={task.goal.icon} class="h-4 w-8 pr-3 text-gray-400" />
		{/if}
		<span class="w-12">{task.duration}</span>
		<span class="flex w-16 justify-center">
			<span
				class={clsx(
					task.isDone
						? 'bg-green-50 text-green-700 ring-green-600/20'
						: 'bg-red-50 text-red-700 ring-red-600/20',
					'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
				)}
			>
				{task.isDone ? 'Done' : 'Undone'}
			</span>
		</span>
	</button>
</li>
