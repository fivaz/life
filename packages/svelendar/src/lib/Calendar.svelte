<script lang="ts">
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

<div
	class="flex h-[calc(100vh-56px)] flex-col divide-y divide-gray-300 border-gray-300 bg-gray-50 md:h-[calc(100vh-20px)] dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
>
	<CalendarHeader />
	<CalendarBody tasks={sortTasks(tasks)} />
</div>
