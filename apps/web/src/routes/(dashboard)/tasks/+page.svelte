<script lang="ts">
	import { Button, LText, Modal } from '@life/shared';
	import { parseDate } from '@life/shared/date';
	import { parse } from 'date-fns';
	import { where } from 'firebase/firestore';
	import { FileSearch2Icon } from 'lucide-svelte';

	import { fetchTasks } from '$lib/task/task.repository';
	import NewTaskButton from '$lib/task/task-form/NewTaskButton.svelte';
	import { DATE_FR, title } from '$lib/utils.svelte';

	import type { TaskLists } from './service';
	import { getTaskLists } from './service';
	import { tasksPageList } from './service.svelte';
	import TaskListByPeriod from './task-by-period/TaskListByPeriod.svelte';
	import TasksStats from './TasksStats.svelte';

	title.value = 'Tasks';

	let tasksByPeriod = $state<TaskLists>({} as TaskLists);

	let isStatsShown = $state(false);

	// Sorting logic for periods: enforce consistent ordering
	const weight: Record<string, number> = {
		overdue: 0,
		today: 1,
		tomorrow: 2,
		thisWeek: 3,
		nextWeek: 4,
		someday: 5,
		recurringDaily: 10,
		recurringWeekly: 11,
		recurringMonthly: 12,
		recurringYearly: 13,
	};

	function sortKey(key: string): [number, number, string] {
		// Known buckets get fixed weights.
		if (key in weight) return [weight[key], 0, key];
		// Unknown keys may be formatted date buckets from service.ts (DATE_FR) or legacy (DATE)
		try {
			let d = parseDate(key);
			let time = d?.getTime?.();
			if (!(typeof time === 'number' && !Number.isNaN(time))) {
				// Try French format fallback
				d = parse(key, DATE_FR, new Date());
				time = d?.getTime?.();
			}
			if (typeof time === 'number' && !Number.isNaN(time)) {
				// Place specific dates between nextWeek (4) and someday (5), ordered by date
				return [4.5, time, key];
			}
		} catch {
			// fallthrough to unknown bucket handling
		}
		// Unknown/non-date buckets go after recurrings, keep name as last tiebreaker
		return [20, 0, key];
	}

	const orderedPeriods = $derived(
		Object.keys(tasksByPeriod).sort((a, b) => {
			const [ga, ta, na] = sortKey(a);
			const [gb, tb, nb] = sortKey(b);
			if (ga !== gb) return ga - gb;
			if (ta !== tb) return ta - tb;
			return na.localeCompare(nb);
		}),
	);

	fetchTasks(
		(existingTasks) => {
			tasksByPeriod = getTaskLists(existingTasks);
			tasksPageList.value = existingTasks;
		},
		where('isDone', '==', false),
	);
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:px-6 lg:px-8">
	<!--header-->
	<div class="flex items-center justify-between gap-5">
		<div>
			<LText class="hidden text-2xl font-bold md:block">{title.value}</LText>
		</div>

		<div class="flex items-center justify-between gap-5 md:grow-0">
			<Button
				class="text-indigo-500"
				color="light"
				onclick={() => (isStatsShown = true)}
				padding="p-1.5"
			>
				<FileSearch2Icon class="size-5" />
			</Button>

			<div class=" h-7 border-r border-gray-300 dark:border-gray-700"></div>
			<NewTaskButton />
		</div>
	</div>

	<!--body-->
	<div class="flex flex-col gap-5">
		<ul class="flex flex-col gap-3">
			{#each orderedPeriods as period}
				<TaskListByPeriod {period} bind:tasksByPeriod />
			{/each}
		</ul>
	</div>
</div>

<Modal bind:isOpen={isStatsShown}>
	<TasksStats {tasksByPeriod} />
</Modal>
