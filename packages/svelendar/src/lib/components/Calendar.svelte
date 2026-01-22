<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { sortTasks } from '@life/shared/task';

	import CalendarBody from '$lib/components/calendar-body/CalendarBody.svelte';
	import CalendarHeader from '$lib/components/calendar-header/CalendarHeader.svelte';

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
		isLoading: boolean;
		changeDate: ChangeDateFn;
		createTask: CreateTaskFn;
		editTask: EditTaskFn;
		toggleCompletion: ToggleCompletionFn;
		moveEvent: MoveEventFn;
	}

	let { tasks, isLoading, changeDate, createTask, editTask, toggleCompletion, moveEvent }: Props =
		$props();

	// this closure is necessary to preserve reactivity - https://svelte.dev/e/state_referenced_locally
	setChangeDate(() => changeDate);
	setCreateTask(() => createTask);
	setEditTask(() => editTask);
	setMoveEvent(() => moveEvent);
	setToggleCompletion(() => toggleCompletion);

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
	<CalendarHeader {isLoading} />
	<CalendarBody tasks={sortTasks(tasks)} />
</div>
