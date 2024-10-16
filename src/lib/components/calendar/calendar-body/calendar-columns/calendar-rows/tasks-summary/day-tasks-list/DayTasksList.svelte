<script lang="ts">
	import type { AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import { getTotalDuration } from '$lib/task/time-utils';
	import { isToDo } from '$lib/task/utils';
	import { CalendarClock, CalendarDays } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, format, parse } from 'date-fns';
	import { createEventDispatcher, getContext } from 'svelte';

	import GoalIcon from '../../../../../../../../routes/dashboard/goals/goal-form/goal-icon/GoalIcon.svelte';

	export let tasks: AnyTask[];

	const dispatch = createEventDispatcher<{
		close: null;
		editTask: { targetDate: string; task: AnyTask };
		persistToDos: ToDo[];
	}>();

	$: uncompletedTasks = tasks.filter((toDo) => toDo.isDone === false);

	$: uncompletedDuration = getTotalDuration(uncompletedTasks);

	$: doneDuration = getTotalDuration(tasks.filter((toDo) => toDo.isDone === true));

	$: {
		if (tasks.length === 0) {
			dispatch('close');
		}
	}

	function postponeToDos() {
		const postponedToDos = uncompletedTasks
			.filter((task): task is ToDo => isToDo(task))
			.map((task) => {
				const dayAfter = format(addDays(parse(task.deadline, DATE, new Date()), 1), DATE);
				return { ...task, deadline: dayAfter };
			});

		persistToDos(postponedToDos);
	}

	const editTask = getContext('editTask');

	const persistToDos = getContext('persistToDos');
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

	<ul class="flex flex-grow flex-col overflow-y-auto py-3">
		{#each tasks as task, index (task)}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
			<li
				class="flex cursor-pointer items-center px-6 py-3 hover:bg-gray-100 hover:underline"
				on:click={() => editTask(task, '')}
			>
				<span class="w-5 pr-3 font-medium text-gray-500">{index + 1}</span>
				<Icon
					class="h-5 w-8 pr-3 text-gray-400"
					src={isToDo(task) ? CalendarDays : CalendarClock}
					theme="solid"
				/>
				<div
					class={clsx(
						{ 'line-through': task.isDone },
						'flex-1 truncate pr-3 font-medium text-gray-500',
					)}
				>
					{task.name}
				</div>

				{#if task.goal?.icon}
					<GoalIcon class="h-4 w-8 pr-3 text-gray-400" name={task.goal.icon} />
				{/if}
				<div class="w-12">{task.duration}</div>
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

	<div class="flex-none p-6">
		{#if uncompletedTasks.length}
			<button class="font-semibold hover:underline" on:click={postponeToDos}>
				Postpone remaining unset tasks <span aria-hidden="true">&rarr;</span>
			</button>
		{/if}
	</div>
</div>
