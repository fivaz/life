<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
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
	<div class="grid h-full grid-cols-7 divide-x">
		{#each dates as date (date)}
			<div class="flex flex-col divide-y">
				<div class="h-8 text-center text-xs">
					<Stats class="justify-center" events={getEvents(date, tasks)} />
					<DueToDos toDos={getToDos(date, tasks)} />
				</div>

				<div class="flex flex-row items-center justify-center gap-1 py-3">
					{format(date, 'E')}
					<span
						class={classnames(
							{ 'rounded-full bg-indigo-600 text-white': isToday(date) },
							'flex h-8 w-8 items-center justify-center font-semibold',
						)}
					>
						{format(date, 'dd')}
					</span>
				</div>
				<CalendarRows
					events={getEvents(date, tasks)}
					on:create={(e) => dispatch('create', { date, timeInterval: e.detail })}
					on:edit
					targetDate={format(date, DATE)}
				/>
			</div>
		{/each}
	</div>
</div>
