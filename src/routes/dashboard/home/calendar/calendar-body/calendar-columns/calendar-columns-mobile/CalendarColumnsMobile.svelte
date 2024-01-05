<script lang="ts">
	import { events } from '$lib/event/store';
	import classnames from 'classnames';
	import { format, getDate, isToday } from 'date-fns';

	import { createEventDispatcher } from 'svelte';
	import CalendarRows from '../calendar-rows/CalendarRows.svelte';
	import { isEventOnDay } from '../service';
	import Stats from '../stats/Stats.svelte';

	export let dates: Date[];

	let className = '';
	export { className as class };

	let selectedDate = new Date();

	$: isSelectedDate = (date: Date) => getDate(selectedDate) === getDate(date);

	const dispatch = createEventDispatcher<{
		create: { timeInterval: number; date: Date };
		move: { timeInterval: number; date: Date };
	}>();
</script>

<div class={classnames('h-full divide-y', className)}>
	<Stats
		class="justify-around"
		events={$events.filter((event) => isEventOnDay(event, selectedDate))}
	/>

	<div class="grid grid-cols-7">
		{#each dates as date (date)}
			<button
				on:click={() => (selectedDate = date)}
				class="flex items-center justify-center gap-1 flex-col pt-2 pb-3"
			>
				{format(date, 'EEEEE')}
				<span
					class={classnames(
						{ 'rounded-full bg-indigo-300 text-white': isSelectedDate(date) && !isToday(date) },
						{ 'rounded-full bg-indigo-600 text-white': isToday(date) },
						'flex items-center justify-center font-semibold h-8 w-8',
					)}
				>
					{format(date, 'dd')}
				</span>
			</button>
		{/each}
	</div>

	<CalendarRows
		events={$events.filter((event) => isEventOnDay(event, selectedDate))}
		on:edit
		on:create={(e) => dispatch('create', { timeInterval: e.detail, date: selectedDate })}
		on:move={(e) => dispatch('move', { timeInterval: e.detail, date: selectedDate })}
	/>
</div>
