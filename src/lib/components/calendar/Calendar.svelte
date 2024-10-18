<script lang="ts">
	import type { AnyEvent, Task, ToDo } from '$lib/task/utils';

	import { updateDateAtMidnight, weekStart } from '$lib/components/calendar/service';
	import { setContext } from 'svelte';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import { tasks as taskStore } from './service';

	updateDateAtMidnight();

	export let tasks: Task[];

	export let fetchTasks: (weekStart: Date) => void;

	export let createTask: (date: Date) => void;

	export let editTask: (task: Task, date: string) => void;

	export let persistToDos: (toDos: ToDo[]) => void;

	export let toggleEvent: (event: AnyEvent, targetDate: string) => void;

	export let moveEvent: (
		event: AnyEvent,
		moveObject: {
			date: string;
			duration: string;
			oldDate: string;
			startTime: string;
		},
	) => void;

	$: $taskStore = tasks;

	setContext('createTask', createTask);

	setContext('editTask', editTask);

	setContext('moveEvent', moveEvent);

	setContext('persistToDos', persistToDos);

	setContext('toggleEvent', toggleEvent);

	setContext('fetchTasks', fetchTasks);

	$: fetchTasks($weekStart);
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody />
</div>
