<script lang="ts">
	import { getNextRoundedTime } from '@life/lib/date';
	import type { Task } from '@life/lib/task';

	import { GRID_CELL_TIME } from './calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import type { MoveEventType } from './context.utils';
	import {
		setChangeDate,
		setCreateTask,
		setEditTask,
		setMoveEvent,
		setPersistTasks,
		setToggleCompletion,
	} from './context.utils';
	import { currentDate } from './service.svelte';

	interface Props {
		tasks: Task[];
		changeDate: (date: Date) => void;
		createTask: (date: Date) => void;
		editTask: (task: Task, date: string) => void;
		persistTasks: (tasks: Task[]) => void;
		toggleCompletion: (event: Task, targetDate: string) => void;
		moveEvent: MoveEventType;
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
	<CalendarBody {tasks} />
</div>
