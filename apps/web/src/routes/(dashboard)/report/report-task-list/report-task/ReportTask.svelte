<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { CalendarMinus, CalendarPlus, Sparkles } from 'lucide-svelte';

	import { tooltip } from '$lib/components/tooltip/tooltip.action';

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
		<div class="block truncate text-sm font-semibold leading-6">{task.name}</div>
	</div>

	<div>
		{#if isAdd && !task.isDone}
			<div use:tooltip={'task remains undone'}>
				<Sparkles class="h-5 w-5 text-white" />
			</div>
		{/if}
	</div>
</li>
