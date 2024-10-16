<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';
	import type { Query } from 'firebase/firestore';

	import {
		subscribeToWeekTasks,
		updateDateAtMidnight,
		weekStart,
	} from '$lib/components/calendar/service';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	updateDateAtMidnight();

	export let fetchTasks: (weekStart: Date) => Query<AnyTask>;

	$: subscribeToWeekTasks(fetchTasks($weekStart));
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader on:createTask />
	<CalendarBody on:createTask on:editTask on:moveEvent on:persistToDos on:toggleEvent />
</div>
