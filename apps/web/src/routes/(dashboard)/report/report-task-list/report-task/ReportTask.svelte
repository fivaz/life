<script lang='ts'>
	import { parseDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isBefore, startOfDay } from 'date-fns';
	import { ArchiveIcon, ArchiveXIcon, CalendarMinus, CalendarPlus } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	interface Props {
		task: Task;
		isAdd?: boolean;
		index: number;
	}

	let { task, index, isAdd = false }: Props = $props();

	function isOld(task: Task): boolean {
		try {
			return isBefore(startOfDay(new Date(task.createdAt)), startOfDay(parseDate(task.date)));
		} catch (e) {
			console.log(e);
			return false;
		}
	}
</script>

<li
	class="
	{isAdd ? 'bg-red-500 dark:bg-red-600' : 'bg-green-500 dark:bg-green-600'}
	flex justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div class='flex items-center gap-x-2'>
		{index}
		{#if isAdd}
			<CalendarPlus class='size-5 text-white' />
		{:else}
			<CalendarMinus class='size-5 text-white' />
		{/if}
		<div class='block truncate text-sm font-semibold leading-6'>{task.name}</div>
	</div>

	<div>
		{#if isAdd && !task.isDone}
			<div use:tooltip={'task remains undone'}>
				<ArchiveIcon class='size-5 text-white' />
			</div>
		{:else if !isAdd && task.isDone && isOld(task)}
			<div use:tooltip={'old task completed'}>
				<ArchiveXIcon class='size-5 text-white' />
			</div>
		{/if}
	</div>
</li>
