<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { CalendarMinus, CalendarPlus, Sparkles } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';

	interface Props {
		task: Task;
		isAdd?: boolean;
		index: number;
	}

	let { task, index, isAdd = false }: Props = $props();
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
		{#if isAdd && !task.isDone}
			<div use:tooltip={'task remains undone'}>
				<Sparkles class="size-5 text-white" />
			</div>
		{/if}
	</div>
</li>
