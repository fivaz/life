<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { DATE_FR } from '$lib/consts.js';
	import { getTaskDate } from '$lib/task/time-utils';
	import { CalendarDays } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { format } from 'date-fns';

	export let tasks: AnyTask[];

	function showDate(task: AnyTask) {
		const date = getTaskDate(task);
		if (!date) {
			return 'N/A';
		}
		return format(date, DATE_FR);
	}
</script>

<ul role="list">
	{#each tasks as task (task)}
		<li
			class="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100 hover:underline"
		>
			<div class={clsx({ 'line-through': task.isDone }, 'flex items-center gap-3')}>
				<Icon class="h-6 w-6 text-gray-400" src={CalendarDays} theme="solid" />
				<span class="w-20">{showDate(task)}</span>
				<span class="truncate">{task.name}</span>
			</div>
			<div class="w-16">
				<div
					class={clsx(
						task.isDone
							? 'bg-green-50 text-green-700 ring-green-600/20'
							: 'bg-red-50 text-red-700 ring-red-600/20',
						'm-auto w-max rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
					)}
				>
					{task.isDone ? 'Done' : 'Undone'}
				</div>
			</div>
		</li>
	{/each}
</ul>
