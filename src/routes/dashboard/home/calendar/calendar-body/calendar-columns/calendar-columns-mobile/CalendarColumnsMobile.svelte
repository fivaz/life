<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';

	import { DATE } from '$lib/consts';
	import classnames from 'classnames';
	import { format, isSameDay, isToday } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import CalendarRows from '../calendar-rows/CalendarRows.svelte';
	import DueToDos from '../due-to-dos/DueToDos.svelte';
	import { isEventOnDay, isToDoOnDay } from '../service';
	import Stats from '../stats/Stats.svelte';

	let selectedDate = new Date();

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

<div class={classnames('h-full divide-y', className)}>
	<div class="text-xs text-center h-8">
		<Stats class="justify-around" events={getEvents(selectedDate, tasks)} />
		<DueToDos toDos={getToDos(selectedDate, tasks)} />
	</div>

	<div class="grid grid-cols-7">
		{#each dates as date (date)}
			<button
				class="flex items-center justify-center gap-1 flex-col pt-2 pb-3"
				on:click={() => (selectedDate = date)}
			>
				{format(date, 'EEEEE')}
				<span
					class={classnames(
						{ 'rounded-full bg-indigo-600 text-white': isSameDay(selectedDate, date) },
						{ 'rounded-full bg-indigo-300 text-white': isToday(date) },
						'flex items-center justify-center font-semibold h-8 w-8',
					)}
				>
					{format(date, 'dd')}
				</span>
			</button>
		{/each}
	</div>

	<CalendarRows
		events={getEvents(selectedDate, tasks)}
		on:create={(e) => dispatch('create', { date: selectedDate, timeInterval: e.detail })}
		on:edit
		targetDate={format(selectedDate, DATE)}
	/>
</div>
