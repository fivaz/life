<script lang="ts">
	import { currentDate, selectedDate, weekStart } from '$lib/components/calendar/service.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import WeekChanger from '$lib/components/week-changer/WeekChanger.svelte';
	import { DATE } from '$lib/consts';
	import { getCurrentRoundedDate } from '$lib/task/time-utils';
	import { format } from 'date-fns';
	import { getContext } from 'svelte';
	import { Plus } from 'lucide-svelte';

	const createTask = getContext('createTask');

	function createEvent() {
		createTask(getCurrentRoundedDate());
	}

	const changeWeekCallback = getContext('changeWeek');

	$effect(() => {
		changeWeekCallback(weekStart.value);
	});
</script>

<header class="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
	<div>
		<h1 class="flex items-center gap-2 text-base font-semibold leading-6 text-gray-900">
			<time class="sm:hidden" dateTime={format(selectedDate.value, DATE)}>
				{format(selectedDate.value, 'MMM dd, yyyy')}
			</time>
			<time class="hidden sm:inline" dateTime={format(selectedDate.value, DATE)}>
				{format(selectedDate.value, 'MMMM dd, yyyy')}
			</time>
		</h1>
		<div class="mt-1 flex items-center gap-1 text-sm text-gray-500">
			<p>{format(selectedDate.value, 'eeee')}</p>
			<time dateTime={format(selectedDate.value, DATE)}>
				{format(currentDate.value, 'hh:mm')}
			</time>
		</div>
	</div>

	<div class="flex items-center gap-5">
		<WeekChanger bind:selectedDate={selectedDate.value} bind:weekStart={weekStart.value} />

		<div class="hidden h-7 border-r border-gray-300 md:block"></div>

		<Button onclick={createEvent} type="button">
			<Plus class="h-4 w-auto" />
			<span class="hidden md:block">Add event</span>
		</Button>
	</div>
</header>
