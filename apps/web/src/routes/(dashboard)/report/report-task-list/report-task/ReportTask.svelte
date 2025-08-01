<script lang="ts">
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isBefore, startOfDay } from 'date-fns';
	import { AlarmClockIcon, AlarmClockOffIcon, CalendarMinus, CalendarPlus } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	interface Props {
		task: Task;
		isAdd?: boolean;
		index: number;
	}

	let { task, index, isAdd = false }: Props = $props();

	const isOld = (task: Task): boolean => {
		if (!task.createdAt || !task.date) return false;

		try {
			const created = startOfDay(new Date(task.createdAt));
			const target = startOfDay(parseDate(task.date));
			return isBefore(created, target);
		} catch {
			return false;
		}
	};

	const isOldTaskRemaining = $derived(isAdd && !task.isDone);

	const isOldTaskDone = $derived(!isAdd && task.isDone && isOld(task));
</script>

<li
	class="
	{isAdd ? 'bg-red-500 dark:bg-red-600' : 'bg-green-500 dark:bg-green-600'}
	flex justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div class="flex items-center gap-x-2">
		{index}
		{#if isAdd}
			<CalendarPlus class="size-5 text-white" />
		{:else}
			<CalendarMinus class="size-5 text-white" />
		{/if}
		<div class="block truncate text-sm font-semibold leading-6">{task.name}</div>
	</div>

	<div>
		{#if isOldTaskRemaining}
			<div aria-label="Task remains undone" use:tooltip={'task remains undone'}>
				<AlarmClockIcon class="size-5 text-white" />
			</div>
		{:else if isOldTaskDone}
			<div aria-label="old task completed" use:tooltip={'old task completed'}>
				<AlarmClockOffIcon class="size-5 text-white" />
			</div>
		{/if}
	</div>
</li>
