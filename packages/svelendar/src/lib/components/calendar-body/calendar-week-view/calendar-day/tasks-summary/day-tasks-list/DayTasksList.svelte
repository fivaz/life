<script lang="ts">
	import type { Task } from '@life/shared/task';

	import DaySummaryTabs from '$lib/components/calendar-body/calendar-week-view/calendar-day/tasks-summary/day-tasks-list/day-summary-tabs/DaySummaryTabs.svelte';

	import DayReview from './day-review/DayReview.svelte';
	import DayTaskItem from './day-task-item/DayTaskItem.svelte';

	interface Props {
		tasks: Task[];
		close: () => void;
		date: Date;
	}

	let { tasks, close, date }: Props = $props();

	let doneTasks = $derived(tasks.filter((toDo) => toDo.isDone));

	let currentTab = $state<'plan' | 'currently'>('plan');

	let reviewTasks = $derived(currentTab === 'plan' ? tasks : doneTasks);

	$effect(() => {
		if (tasks.length === 0) {
			close();
		}
	});
</script>

<div
	class="relative flex h-auto max-h-[90%] w-11/12 max-w-135.75 flex-col divide-y divide-gray-400 rounded-lg border border-gray-400 bg-gray-50 text-sm leading-6 shadow-2xs dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:scheme-dark"
>
	<div class="flex-none p-6">
		<DaySummaryTabs bind:activeTab={currentTab} />
		<div class="mt-4">
			<DayReview {date} tasks={reviewTasks} />
		</div>
	</div>

	<ul class="overflow-auto py-3">
		{#each tasks as task, index (task)}
			<DayTaskItem {date} {index} {task} />
		{/each}
	</ul>
</div>
