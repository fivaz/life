<script lang="ts">
	import { getNextRoundedTime } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';

	import { GRID_CELL_TIME } from './calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte.js';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import type {
		ChangeDateFn,
		CreateTaskFn,
		EditTaskFn,
		MoveEventFn,
		PersistTasksFn,
		ToggleCompletionFn,
	} from './context.utils.js';
	import {
		setChangeDate,
		setCreateTask,
		setEditTask,
		setMoveEvent,
		setPersistTasks,
		setToggleCompletion,
	} from './context.utils.js';
	import { currentDate } from './service.svelte.js';

	interface Props {
		tasks: Task[];
		changeDate: ChangeDateFn;
		createTask: CreateTaskFn;
		editTask: EditTaskFn;
		persistTasks: PersistTasksFn;
		toggleCompletion: ToggleCompletionFn;
		moveEvent: MoveEventFn;
	}

	let {
		tasks,
		changeDate,
		createTask,
		editTask,
		persistTasks,
		toggleCompletion,
		moveEvent,
	}: Props = $props();

	let timeUntilNextUpdate = $state(getNextRoundedTime());

	setChangeDate(changeDate);
	setCreateTask(createTask);
	setEditTask(editTask);
	setMoveEvent(moveEvent);
	setPersistTasks(persistTasks);
	setToggleCompletion(toggleCompletion);

	$effect(() => {
		const interval = setInterval(() => {
			currentDate.value = new Date();
			timeUntilNextUpdate = GRID_CELL_TIME * 60 * 1000;
		}, timeUntilNextUpdate);

		return () => clearInterval(interval);
	});
</script>

<div class="flex h-[calc(100vh-56px)] flex-col md:h-[calc(100vh-20px)]">
	<CalendarHeader />
	<CalendarBody tasks={sortTasks(tasks)} />
</div>
