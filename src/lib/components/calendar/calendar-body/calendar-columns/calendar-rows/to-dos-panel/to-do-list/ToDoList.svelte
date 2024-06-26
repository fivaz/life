<script lang="ts">
	import type { AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import { getTotalDuration } from '$lib/task/time-utils';
	import { getDuration } from '$lib/task/utils';
	import { CalendarDays } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { addDays, format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let toDos: ToDo[];

	const dispatch = createEventDispatcher<{
		close: null;
		editTask: { targetDate: string; task: AnyTask };
		persistToDos: ToDo[];
	}>();

	$: uncompletedToDos = toDos.filter((toDo) => toDo.isDone === false);

	$: totalDuration = getTotalDuration(uncompletedToDos);

	$: {
		if (toDos.length === 0) {
			dispatch('close');
		}
	}

	function postponeToDos() {
		const postponedToDos = uncompletedToDos.map((toDo) => {
			const dayAfter = format(addDays(parse(toDo.deadline, DATE, new Date()), 1), DATE);
			return { ...toDo, deadline: dayAfter };
		});

		dispatch('persistToDos', postponedToDos);
	}
</script>

<div class="relative w-11/12 max-w-[543px] text-sm leading-6 text-gray-900">
	<h2 class="sr-only">To Dos</h2>
	<div class="divide-y divide-gray-900/5 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
		<div class="p-6 font-semibold">
			<div>Pending Tasks</div>
			{#if uncompletedToDos.length}
				<div class="mt-1"><span class="text-base">{totalDuration}</span> to complete</div>
			{/if}
		</div>

		<ul class="flex flex-col py-3">
			{#each toDos as toDo (toDo)}
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
				<li
					class="flex cursor-pointer justify-between gap-3 px-6 py-3 hover:bg-gray-100 hover:underline"
					on:click={() => dispatch('editTask', { targetDate: '', task: toDo })}
				>
					<div class="flex gap-3 truncate">
						<Icon class="h-6 w-6 text-gray-400" src={CalendarDays} theme="solid" />
						<div
							class={clsx(
								{ 'line-through': toDo.isDone },
								'w-[calc(100%-24px)] truncate font-medium text-gray-500',
							)}
						>
							{toDo.name}
						</div>
					</div>
					<div class="flex gap-3">
						<div>{getDuration(toDo)}</div>
						<div class="w-16">
							<div
								class={clsx(
									toDo.isDone
										? 'bg-green-50 text-green-700 ring-green-600/20'
										: 'bg-red-50 text-red-700 ring-red-600/20',
									'm-auto w-max rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
								)}
							>
								{toDo.isDone ? 'Done' : 'Undone'}
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		{#if uncompletedToDos.length}
			<div class="p-6">
				<button class="font-semibold hover:underline" on:click={postponeToDos}>
					Postpone remaining tasks <span aria-hidden="true">&rarr;</span>
				</button>
			</div>
		{/if}
	</div>
</div>
