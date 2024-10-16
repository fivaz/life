<script lang="ts">
	import { selectedDate } from '$lib/components/calendar/service';
	import { differenceInMilliseconds, endOfToday } from 'date-fns';
	import { setContext } from 'svelte';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	function updateDateAtMidnight() {
		console.warn('updateDateAtMidnight');
		const now = new Date();
		const timeUntilMidnight = differenceInMilliseconds(endOfToday(), now);

		setTimeout(() => {
			$selectedDate = new Date();
			updateDateAtMidnight(); // Schedule the next update for the following midnight
		}, timeUntilMidnight);
	}

	updateDateAtMidnight();

	export let fetchTasks: (weekStart: Date) => void;

	setContext('fetchTasks', fetchTasks);
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader on:createTask />
	<CalendarBody on:createTask on:editTask on:moveEvent on:persistToDos on:toggleEvent />
</div>
