<script lang="ts">
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { parseISO } from 'date-fns';
	import { CalendarMinus, CalendarPlus } from 'lucide-svelte';

	interface Props {
		task: Task;
		isAdd?: boolean;
	}

	let { task, isAdd = false }: Props = $props();
</script>

<li
	class="
	{isAdd ? 'bg-green-500' : 'bg-red-500'}
	flex justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div class="flex items-center gap-x-2">
		{#if isAdd}
			<CalendarPlus class="h-5 w-5 text-white" />
		{:else}
			<CalendarMinus class="h-5 w-5 text-white" />
		{/if}
		<div class="text-sm font-semibold leading-6">
			{task.name} - created: {formatDate(parseISO(task.createdAt))} - done:{task.date}
		</div>
	</div>

	<div></div>
</li>
