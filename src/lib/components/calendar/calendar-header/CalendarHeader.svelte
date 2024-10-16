<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { selectedDate, subscribeToWeekTasks, weekStart } from '$lib/components/calendar/service';
	import Button from '$lib/components/form/button/Button.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import { DATE } from '$lib/consts';
	import { getCurrentRoundedDate } from '$lib/task/time-utils';
	import { format } from 'date-fns';
	import { Query } from 'firebase/firestore';
	import { Plus } from 'lucide-svelte';
	import { createEventDispatcher, getContext } from 'svelte';

	const dispatch = createEventDispatcher<{ createTask: Date }>();

	$: createEvent = () => dispatch('createTask', getCurrentRoundedDate());

	const fetchTasks = getContext<(weekStart: Date) => Query<AnyTask>>('fetchTasks');
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
	<div>
		<h1 class="text-base font-semibold leading-6 text-gray-900">
			<time class="sm:hidden" dateTime={format($selectedDate, DATE)}>
				{format($selectedDate, 'MMM dd, yyyy')}
			</time>
			<time class="hidden sm:inline" dateTime={format($selectedDate, DATE)}>
				{format($selectedDate, 'MMMM dd, yyyy')}
			</time>
		</h1>
		<p class="mt-1 text-sm text-gray-500">{format($selectedDate, 'eeee')}</p>
	</div>

	<div class="flex items-center gap-5">
		<WeekChanger
			bind:selectedDate={$selectedDate}
			bind:weekStart={$weekStart}
			on:updateWeekStart={(e) => subscribeToWeekTasks(fetchTasks(e.detail))}
		/>

		<div class="hidden h-7 border-r border-gray-300 md:block"></div>

		<Button on:click={createEvent} type="button">
			<Plus class="h-4 w-auto" />
			<span class="hidden md:block">Add event</span>
		</Button>
	</div>
</header>
