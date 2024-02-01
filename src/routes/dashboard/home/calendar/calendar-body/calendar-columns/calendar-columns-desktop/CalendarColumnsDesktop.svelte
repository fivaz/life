<script lang="ts">
	import type { Task } from '$lib/task/utils';
	import classnames from 'classnames';
	import { format, isToday } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import CalendarRows from '../calendar-rows/CalendarRows.svelte';
	import DueToDos from '../due-to-dos/DueToDos.svelte';
	import { isEventOnDay, isToDoOnDay } from '../service';
	import Stats from '../stats/Stats.svelte';

	export let dates: Date[];

	export let tasks: Task[];

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		create: { timeInterval: number; date: Date };
		move: { timeInterval: number; date: Date };
	}>();
</script>

<div class={className}>
	<div class="h-full grid grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div class="flex flex-col divide-y">
				<div class="text-xs text-center h-8">
					<Stats
						events={tasks.filter((event) => isEventOnDay(event, date))}
						class="justify-center"
					/>
					<DueToDos toDos={tasks.filter((task) => isToDoOnDay(task, date))} />
				</div>

				<div class="flex items-center justify-center gap-1 flex-row py-3">
					{format(date, 'E')}
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': isToday(date) },
							'flex items-center justify-center font-semibold h-8 w-8',
						)}
					>
						{format(date, 'dd')}
					</span>
				</div>
				<CalendarRows
					targetDate={date}
					events={tasks.filter((event) => isEventOnDay(event, date))}
					on:edit
					on:create={(e) => dispatch('create', { timeInterval: e.detail, date })}
					on:move={(e) => dispatch('move', { timeInterval: e.detail, date })}
				/>
			</div>
		{/each}
	</div>
</div>
