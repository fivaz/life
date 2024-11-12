<script lang="ts">
	import { setContext } from 'svelte';

	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
	import { currentDate, getNextRoundedTime } from '$lib/components/calendar/service.svelte';
	import type { Task } from '$lib/task/utils';

	import type { Context } from '../../../vite-env';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	interface Props {
		tasks: Task[];
		changeWeek: Context['changeWeek'];
		createTask: Context['createTask'];
		editTask: Context['editTask'];
		persistTasks: Context['persistTasks'];
		toggleEvent: Context['toggleEvent'];
		moveEvent: Context['moveEvent'];
	}

	let { tasks, changeWeek, createTask, editTask, persistTasks, toggleEvent, moveEvent }: Props =
		$props();

	let timeUntilNextUpdate = $state(getNextRoundedTime());

	setContext('createTask', createTask);
	setContext('editTask', editTask);
	setContext('moveEvent', moveEvent);
	setContext('persistTasks', persistTasks);
	setContext('toggleEvent', toggleEvent);
	setContext('changeWeek', changeWeek);

	$effect(() => {
		const interval = setInterval(() => {
			currentDate.value = new Date();
			timeUntilNextUpdate = GRID_CELL_TIME * 60 * 1000;
		}, timeUntilNextUpdate);

		return () => clearInterval(interval);
	});
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody {tasks} />
</div>
