<script lang="ts">
	import type { Task } from '$lib/task/utils';

	import { updateDateAtMidnight } from '$lib/components/calendar/service.svelte';
	import { setContext } from 'svelte';

	import type { Context } from '../../../app';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	updateDateAtMidnight();

	interface Props {
		tasks: Task[];
		changeWeek: Context['changeWeek'];
		createTask: Context['createTask'];
		editTask: Context['editTask'];
		persistToDos: Context['persistToDos'];
		toggleEvent: Context['toggleEvent'];
		moveEvent: Context['moveEvent'];
	}

	let { tasks, changeWeek, createTask, editTask, persistToDos, toggleEvent, moveEvent }: Props =
		$props();

	setContext('createTask', createTask);

	setContext('editTask', editTask);

	setContext('moveEvent', moveEvent);

	setContext('persistToDos', persistToDos);

	setContext('toggleEvent', toggleEvent);

	setContext('changeWeek', changeWeek);
</script>

<div class="flex h-screen flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody {tasks} />
</div>
