<script lang="ts">
	import { CalendarDays } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { format } from 'date-fns';

	import { DATE_FR } from '$lib/date.utils.svelte';
	import type { Task } from '$lib/task/task.model';
	import { getTaskDate } from '$lib/task/time-utils';

	interface Props {
		tasks: Task[];
		editTask: (task: Task) => void;
	}

	let { tasks, editTask }: Props = $props();

	function showDate(task: Task) {
		const date = getTaskDate(task);
		if (!date) {
			return 'N/A';
		}
		return format(date, DATE_FR);
	}
</script>

<ul role="list">
	{#each tasks as task (task)}
		<li>
			<button
				class="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-gray-100 hover:underline"
				onclick={() => editTask(task)}
			>
				<span
					class="flex w-[calc(100%-64px)] items-center gap-3 truncate"
					class:line-through={task.isDone}
				>
					<Icon class="h-6 w-6 text-gray-400" src={CalendarDays} theme="solid" />
					<span class="hidden w-20 md:block">{showDate(task)}</span>
					<span class="w-[calc(100%-24px)] truncate text-left">{task.name}</span>
				</span>
				<span class="w-16">
					<span
						class={clsx(
							task.isDone
								? 'bg-green-50 text-green-700 ring-green-600/20'
								: 'bg-red-50 text-red-700 ring-red-600/20',
							'm-auto w-max rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
						)}
					>
						{task.isDone ? 'Done' : 'Undone'}
					</span>
				</span>
			</button>
		</li>
	{/each}
</ul>
