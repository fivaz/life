<script lang="ts">
	import { LText } from '@life/shared';
	import { CATEGORY_WORK } from '@life/shared/category';
	import type { Task } from '@life/shared/task';
	import { getTotalDuration } from '@life/shared/task';
	import { Grid2x2Icon, Grid3X3Icon } from 'lucide-svelte';

	import { getPeriodLabel } from './period-labels';
	import type { TaskLists, TaskListType } from './service';

	interface Props {
		tasksByPeriod: TaskLists;
		periods: (TaskListType | string)[];
	}

	let { tasksByPeriod, periods }: Props = $props();

	let tasksBySinglePeriod = $derived.by(() => {
		const { recurringDaily, recurringWeekly, recurringMonthly, recurringYearly, ...rest } =
			tasksByPeriod;
		return rest;
	});

	let total = $derived(Object.values(tasksBySinglePeriod).flat());

	let workTasks = $derived(total.filter((task) => task.category.type === CATEGORY_WORK));

	// this is only necessary to fix typescript errors
	function getTasks(period: string): Task[] {
		return tasksByPeriod[period];
	}
</script>

<div class="relative w-11/12 max-w-[350px] text-sm leading-6">
	<div
		class="divide-y divide-gray-200 rounded-lg border-gray-200 bg-white shadow-xs dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="px-6 py-4">
			<LText class="text-base font-semibold">Tasks stats</LText>
		</div>

		<ul class="flex flex-col py-3">
			<li class="flex cursor-pointer justify-between gap-3 px-6 py-3 font-semibold">
				<LText class="grow">date</LText>
				<LText class="w-16">quantity</LText>
				<LText class="w-16 text-right">duration</LText>
			</li>
			{#each periods as period (period)}
				{@render list(
					Grid2x2Icon,
					period,
					getTasks(period).length,
					getTotalDuration(getTasks(period)),
				)}
			{/each}
			{@render list(Grid3X3Icon, 'Work tasks', workTasks.length, getTotalDuration(workTasks))}
			{@render list(Grid3X3Icon, 'Total', total.length, getTotalDuration(total))}
		</ul>
	</div>
</div>

{#snippet list(Icon: typeof Grid3X3Icon, period: string, quantity: number, duration: string)}
	<li
		class="flex cursor-pointer justify-between gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900"
	>
		<div class="flex grow gap-3">
			<LText><Icon class="size-6" /></LText>
			<LText>{getPeriodLabel(period)}</LText>
		</div>
		<LText class="w-16 text-center">{quantity}</LText>
		<LText class="w-16 text-right">{duration}</LText>
	</li>
{/snippet}
