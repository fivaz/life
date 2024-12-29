<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { tailwindColorMap } from '@life/shared/category';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isUntimed } from '@life/shared/task';
	import { CalendarClock, CalendarDays, Settings2, Tag } from '@steeze-ui/lucide-icons';
	import { CalendarMinus, CalendarPlus, GripVertical } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

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
		<div class="text-sm font-semibold leading-6">{task.name}</div>
	</div>

	<div></div>
</li>
