<script lang="ts">
	import type { Task } from '$lib/task/utils';

	import { updateDateAtMidnight, weekStart } from '$lib/components/calendar/service';
	import { setContext } from 'svelte';

	import type { Context } from '../../../app';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { tasks as taskStore } from './service';

	updateDateAtMidnight();

	export let tasks: Task[];

	export let changeWeek: Context['changeWeek'];

	export let createTask: Context['createTask'];

	export let editTask: Context['editTask'];

	export let persistToDos: Context['persistToDos'];

	export let toggleEvent: Context['toggleEvent'];

	export let moveEvent: Context['moveEvent'];

	$: $taskStore = tasks;

	setContext('createTask', createTask);

	setContext('editTask', editTask);

	setContext('moveEvent', moveEvent);

	setContext('persistToDos', persistToDos);

	setContext('toggleEvent', toggleEvent);

	setContext('changeWeek', changeWeek);

	$: changeWeek($weekStart);
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody />
</div>
