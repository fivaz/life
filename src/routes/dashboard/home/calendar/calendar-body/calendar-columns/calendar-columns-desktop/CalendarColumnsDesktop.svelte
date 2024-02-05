<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import classnames from 'classnames';
	import { format, isToday } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import CalendarRows from '../calendar-rows/CalendarRows.svelte';
	import DueToDos from '../due-to-dos/DueToDos.svelte';
	import { isEventOnDay, isToDoOnDay } from '../service';
	import Stats from '../stats/Stats.svelte';

	export let dates: Date[];

	export let tasks: AnyTask[];

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		create: { date: Date; timeInterval: number };
		move: { date: Date; timeInterval: number };
	}>();

	function getEvents(date: Date, tasks: AnyTask[]): Array<AnyEvent> {
		return tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
	}

	function getToDos(date: Date, tasks: AnyTask[]): Array<ToDo> {
		return tasks.filter((task): task is ToDo => isToDoOnDay(task, date));
	}
</script>

<div class={className}>
	<div class="h-full grid grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div class="flex flex-col divide-y">
				<div class="text-xs text-center h-8">
					<Stats class="justify-center" events={getEvents(date, tasks)} />
					<DueToDos toDos={getToDos(date, tasks)} />
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
					events={getEvents(date, tasks)}
					on:create={(e) => dispatch('create', { date, timeInterval: e.detail })}
					on:edit
					on:move={(e) => dispatch('move', { date, timeInterval: e.detail })}
					targetDate={date}
				/>
			</div>
		{/each}
	</div>
</div>
