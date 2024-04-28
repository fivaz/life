<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import {
		GRID_CELL_TIME,
		NUMBER_OF_CELLS,
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { setHours, setMinutes } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';

	export let dates: Date[];

	export let selectedDate: Date;

	const dispatch = createEventDispatcher<{
		create: Date;
		move: { cellNumber: number; date: Date };
	}>();

	let taskType: AnyTask;

	export function buildDate(date: Date, cellNumber: number): Date {
		if (cellNumber < 0 || cellNumber > NUMBER_OF_CELLS) {
			throw 'Invalid number. Please enter a number between 0 and 95.';
		}

		return setMinutes(setHours(date, 0), cellNumber * GRID_CELL_TIME);
	}
</script>

<SignedIn let:user>
	<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
		<div class="hidden grow md:flex">
			<div class="grid w-full grid-cols-7 divide-x border-x">
				{#each dates as date (date)}
					<CalendarRows
						{date}
						on:click={(e) => dispatch('create', buildDate(date, e.detail))}
						on:edit
						{tasks}
					/>
				{/each}
			</div>
			<div class="w-8" />
		</div>

		<div class="block grow md:hidden">
			<CalendarRows
				date={selectedDate}
				on:click={(e) => dispatch('create', buildDate(selectedDate, e.detail))}
				on:edit
				{tasks}
			/>
		</div>
	</TypedCollection>
</SignedIn>
