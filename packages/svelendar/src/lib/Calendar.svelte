<script lang="ts">
	import { appColors } from '@life/shared/colors';
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';

	import CalendarBody from './calendar-body/CalendarBody.svelte';
	import CalendarHeader from './calendar-header/CalendarHeader.svelte';
	import type {
		ChangeDateFn,
		CreateTaskFn,
		EditTaskFn,
		MoveEventFn,
		ToggleCompletionFn,
	} from './context.utils.js';
	import {
		setChangeDate,
		setCreateTask,
		setEditTask,
		setMoveEvent,
		setToggleCompletion,
	} from './context.utils.js';
	import { updateCurrentDate } from './service.svelte.js';

	interface Props {
		tasks: Task[];
		changeDate: ChangeDateFn;
		createTask: CreateTaskFn;
		editTask: EditTaskFn;
		toggleCompletion: ToggleCompletionFn;
		moveEvent: MoveEventFn;
	}

	let { tasks, changeDate, createTask, editTask, toggleCompletion, moveEvent }: Props = $props();

	setChangeDate(changeDate);
	setCreateTask(createTask);
	setEditTask(editTask);
	setMoveEvent(moveEvent);
	setToggleCompletion(toggleCompletion);

	$effect(() => {
		const interval = setInterval(() => {
			updateCurrentDate();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex h-[calc(100vh-56px)] flex-col divide-y md:h-[calc(100vh-20px)] {appColors.darker}">
	<CalendarHeader />
	<CalendarBody tasks={sortTasks(tasks)} />
</div>
