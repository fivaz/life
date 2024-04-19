<script lang="ts">
	import type { AnyEvent, AnyTask } from '$lib/task/utils';

	import NewCalendarRows from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/NewCalendarRows.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';

	import { isEventOnDay } from '../../../../../routes/dashboard/home/calendar/calendar-body/calendar-columns/service';

	export let dates: Date[];

	let selectedDate = new Date();

	function getEvents(date: Date, tasks: AnyTask[]): Array<AnyEvent> {
		return tasks.filter((task): task is AnyEvent => isEventOnDay(task, date));
	}

	const dispatch = createEventDispatcher<{
		create: { date: Date; timeInterval: number };
		move: { date: Date; timeInterval: number };
	}>();

	let taskType: AnyTask;
</script>

<SignedIn let:user>
	<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
		<div class="hidden grow md:flex">
			<div class="w-full grid grid-cols-7 border-x divide-x">
				{#each dates as date (date)}
					<NewCalendarRows
						events={getEvents(date, tasks)}
						on:create={(e) => dispatch('create', { date, timeInterval: e.detail })}
						on:edit
						targetDate={format(date, DATE)}
					/>
				{/each}
			</div>
			<div class="w-8" />
		</div>

		<div class="md:hidden grow flex">
			<div class="w-full divide-x border-x grow flex">
				<NewCalendarRows
					events={getEvents(selectedDate, tasks)}
					on:create={(e) => dispatch('create', { date: selectedDate, timeInterval: e.detail })}
					on:edit
					targetDate={format(selectedDate, DATE)}
				/>
			</div>
		</div>
	</TypedCollection>
</SignedIn>
