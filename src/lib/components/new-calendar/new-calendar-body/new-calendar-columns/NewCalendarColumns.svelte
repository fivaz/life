<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import NewCalendarRows from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/NewCalendarRows.svelte';
	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';

	export let dates: Date[];

	let selectedDate = new Date();

	const dispatch = createEventDispatcher<{
		create: { date: Date; timeInterval: number };
		move: { date: Date; timeInterval: number };
	}>();

	let taskType: AnyTask;
</script>

<SignedIn let:user>
	<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
		<div class="hidden grow md:flex">
			<div class="grid w-full grid-cols-7 divide-x border-x">
				{#each dates as date (date)}
					<NewCalendarRows
						{date}
						on:create={(e) => dispatch('create', { date, timeInterval: e.detail })}
						on:edit
						{tasks}
					/>
				{/each}
			</div>
			<div class="w-8" />
		</div>

		<div class="flex grow md:hidden">
			<div class="flex w-full grow divide-x border-x">
				<NewCalendarRows
					date={selectedDate}
					on:create={(e) => dispatch('create', { date: selectedDate, timeInterval: e.detail })}
					on:edit
					{tasks}
				/>
			</div>
		</div>
	</TypedCollection>
</SignedIn>
