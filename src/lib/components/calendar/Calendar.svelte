<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';
	import type { Query } from 'firebase/firestore';

	import {
		onChangeWeekStart,
		updateDateAtMidnight,
		weekStart,
	} from '$lib/components/calendar/service';
	import { setContext } from 'svelte';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	updateDateAtMidnight();

	export let fetchTasks: (weekStart: Date) => Query<AnyTask>;

	export let createTask: (date: Date) => void;

	setContext('createTask', createTask);

	$: onChangeWeekStart($weekStart, fetchTasks($weekStart));
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody on:editTask on:moveEvent on:persistToDos on:toggleEvent />
</div>
