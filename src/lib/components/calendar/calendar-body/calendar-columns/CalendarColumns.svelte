<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import TypedCollection from '$lib/components/typed-collection/TypedCollection.svelte';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';

	import CalendarRows from './calendar-rows/CalendarRows.svelte';

	export let dates: Date[];

	let selectedDate = new Date();

	const dispatch = createEventDispatcher<{
		create: { cellNumber: number; date: Date };
		move: { cellNumber: number; date: Date };
	}>();

	let taskType: AnyTask;
</script>

<SignedIn let:user>
	<TypedCollection let:data={tasks} ref={`users/${user.uid}/tasks`} type={taskType}>
		<div class="hidden grow md:flex">
			<div class="grid w-full grid-cols-7 divide-x border-x">
				{#each dates as date (date)}
					<CalendarRows
						{date}
						on:create={(e) => dispatch('create', { cellNumber: e.detail, date })}
						on:edit
						{tasks}
					/>
				{/each}
			</div>
			<div class="w-8" />
		</div>

		<div class="flex grow md:hidden">
			<div class="flex w-full grow divide-x border-x">
				<CalendarRows
					date={selectedDate}
					on:create={(e) => dispatch('create', { cellNumber: e.detail, date: selectedDate })}
					on:edit
					{tasks}
				/>
			</div>
		</div>
	</TypedCollection>
</SignedIn>
