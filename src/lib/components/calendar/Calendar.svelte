<script lang="ts">
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/calendar-grid/service.svelte';
	import type { MoveEventType } from '$lib/components/calendar/service.svelte';
	import {
		getNextRoundedTime,
		setChangeWeek,
		setCreateTask,
		setEditTask,
		setMoveEvent,
		setPersistTasks,
		setToggleEvent,
	} from '$lib/components/calendar/service.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte';
	import { currentDate } from '$lib/date.utils.svelte';
	import type { Task } from '$lib/task/task.model';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';

	interface Props {
		tasks: Task[];
		changeWeek: (weekStart: Date) => void;
		createTask: (date: Date) => void;
		editTask: (task: Task, date: yyyyMMdd) => void;
		persistTasks: (tasks: Task[]) => void;
		toggleEvent: (event: Task, targetDate: yyyyMMdd) => void;
		moveEvent: MoveEventType;
	}

	let { tasks, changeWeek, createTask, editTask, persistTasks, toggleEvent, moveEvent }: Props =
		$props();

	let timeUntilNextUpdate = $state(getNextRoundedTime());

	setChangeWeek(changeWeek);
	setCreateTask(createTask);
	setEditTask(editTask);
	setMoveEvent(moveEvent);
	setPersistTasks(persistTasks);
	setToggleEvent(toggleEvent);

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
