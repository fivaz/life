<script lang="ts">
	import type { AnyEvent, AnyTask, ToDo } from '$lib/task/utils';
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

	export let fetchTasks: (weekStart: Date) => [Query<AnyTask>, Query<AnyTask>];

	export let createTask: (date: Date) => void;

	export let editTask: (task: AnyTask, date: string) => void;

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

	setContext('createTask', createTask);

	setContext('editTask', editTask);

	setContext('moveEvent', moveEvent);

	setContext('persistToDos', persistToDos);

	setContext('toggleEvent', toggleEvent);

	$: onChangeWeekStart($weekStart, fetchTasks($weekStart));
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody />
</div>
