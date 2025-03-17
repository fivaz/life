<script lang="ts">
	import { DoneChip, LText } from '@life/shared';
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
		categories: Category[];
	}

	let { tasks, categories }: Props = $props();

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
				class="group w-full cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-indigo-500 hover:text-white hover:underline"
				{categories}
				color="none"
				{task}
			>
				<div class="flex w-full items-center justify-between gap-3">
					<LText
						class={clsx(
							{ 'line-through': task.isDone },
							'flex items-center gap-3 truncate group-hover:text-white',
						)}
					>
						<CalendarDaysIcon class="size-5 shrink-0" />
						<span class="hidden w-20 md:block">{showDate(task)}</span>
						<span class="w-[calc(100%-24px)] truncate text-left">{task.name}</span>
					</LText>
					<DoneChip isDone={task.isDone} />
				</div>
			</TaskFormButton>
		</li>
	{/each}
</ul>
