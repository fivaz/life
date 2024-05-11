<script lang="ts">
	import type { AnyTask } from '$lib/task/utils';

	import { startOfWeek } from 'date-fns';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	export let tasks: AnyTask[];

	let selectedDate = new Date();

	let weekStart = startOfWeek(new Date());
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader bind:selectedDate bind:weekStart on:createTask />
	<CalendarBody
		bind:selectedDate
		on:createTask
		on:editTask
		on:moveEvent
		on:persistToDos
		on:toggleEvent
		{tasks}
		{weekStart}
	/>
</div>
