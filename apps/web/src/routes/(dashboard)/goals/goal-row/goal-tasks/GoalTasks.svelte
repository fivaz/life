<script lang="ts">
	import { LText } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { clsx } from 'clsx';
	import { format } from 'date-fns';
	import { CalendarDaysIcon } from 'lucide-svelte';

	import type { Category } from '$lib/category/category.model';
	import type { Goal } from '$lib/goal/goal.model';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';
	import { DATE_FR } from '$lib/utils.svelte';

	interface Props {
		tasks: Task[];
		goals: Goal[];
		categories: Category[];
	}

	let { tasks, categories, goals }: Props = $props();

	function showDate(task: Task) {
		if (!task.date) {
			return 'N/A';
		}
		return format(parseDate(task.date), DATE_FR);
	}
</script>

<ul role="list">
	{#each tasks as task (task)}
		<li>
			<TaskFormButton
				class="w-full cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 hover:underline dark:hover:bg-gray-900"
				{categories}
				color="none"
				{goals}
				{task}
			>
				<div class="flex w-full items-center justify-between gap-3">
					<LText
						class={clsx(
							{ 'line-through': task.isDone },
							'flex w-[calc(100%-64px)] items-center gap-3 truncate',
						)}
					>
						<CalendarDaysIcon class="h-6 w-6 text-gray-400" />
						<span class="hidden w-20 md:block">{showDate(task)}</span>
						<span class="w-[calc(100%-24px)] truncate text-left">{task.name}</span>
					</LText>
					<span class="w-16">
						<span
							class={clsx(
								task.isDone
									? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-100'
									: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-100',
								'm-auto w-max rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
							)}
						>
							{task.isDone ? 'Done' : 'Undone'}
						</span>
					</span>
				</div>
			</TaskFormButton>
		</li>
	{/each}
</ul>
