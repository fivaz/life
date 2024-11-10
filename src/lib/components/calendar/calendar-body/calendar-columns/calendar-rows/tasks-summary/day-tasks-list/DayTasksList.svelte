<script lang="ts">
	import { CalendarClock, CalendarDays } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, format, parse } from 'date-fns';
	import { getContext } from 'svelte';

	import { DATE } from '$lib/consts';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import { getTotalDuration } from '$lib/task/time-utils';
	import { type CalendarTask, isRecurring, isTimed } from '$lib/task/utils';
	import { isUntimed } from '$lib/task/utils';

	interface Props {
		tasks: CalendarTask[];
		close: () => void;
		date: Date;
	}

	let { tasks, close, date }: Props = $props();

	let uncompletedTasks = $derived(tasks.filter((toDo) => toDo.isDone === false));

	let uncompletedDuration = $derived(getTotalDuration(uncompletedTasks));

	let doneDuration = $derived(getTotalDuration(tasks.filter((toDo) => toDo.isDone === true)));

	$effect(() => {
		if (tasks.length === 0) {
			close();
		}
	});

	function postponeRemainingUntimedTasks() {
		const untimedTasks = uncompletedTasks.filter((task) => !isTimed(task));

		const untimedTasksUpdated = untimedTasks.map((task) => {
			if (isRecurring(task)) {
				return { ...task, recurringExceptions: [...task.recurringExceptions, format(date, DATE)] };
			} else {
				const dayAfter = format(addDays(parse(task.date, DATE, new Date()), 1), DATE);
				return { ...task, date: dayAfter };
			}
		});

		persistTasks(untimedTasksUpdated);
	}

	const editTask = getContext('editTask');

	const persistTasks = getContext('persistTasks');
</script>

<div
	class="relative flex h-auto max-h-[90%] w-11/12 max-w-[543px] flex-col divide-y divide-gray-900/5 rounded-lg bg-gray-50 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/5"
>
	<div class="flex-none p-6 font-semibold">
		<div>Pending Tasks</div>
		<div class="mt-1 flex justify-between">
			<div><span class="text-green-500">{doneDuration}</span> done</div>
			{#if uncompletedTasks.length}
				<div><span class="text-red-500">{uncompletedDuration}</span> to complete</div>
			{/if}
		</div>
	</div>

	<ul class="py-3">
		{#each tasks as task, index (task)}
			<li class="hover:bg-gray-100 hover:underline">
				<button
					class="flex w-full items-center px-6 py-3 text-left"
					onclick={() => editTask(task, format(date, DATE))}
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
						<GoalIcon class="h-4 w-8 pr-3 text-gray-400" name={task.goal.icon} />
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
		{/each}
	</ul>

	<div class="flex-none p-6">
		{#if uncompletedTasks.length}
			<button class="font-semibold hover:underline" onclick={postponeRemainingUntimedTasks}>
				Postpone remaining unset tasks <span aria-hidden="true">&rarr;</span>
			</button>
		{/if}
	</div>
</div>
