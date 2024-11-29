<script lang="ts">
	import { GoalIcon } from '@life/shared';
	import { tailwindColorMap } from '@life/shared/category';
	import type { Goal } from '@life/shared/goal';

	import type { Category } from '$lib/category/category.model';
	import Collapsable from '$lib/components/collapsable/Collapsable.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { taskIn } from '$lib/task/task-form/service.svelte';
	import TaskFormImage from '$lib/task/task-form/task-form-image/TaskFormImage.svelte';
	import { sumTimes } from '$lib/task/time-utils';

	interface Props {
		categories: Category[];
		goals: Goal[];
	}

	let { categories, goals }: Props = $props();

	// this ensures that whenever the user types - text, it converts to [ ] - text
	function formatSubTasks(description: string) {
		const regex = /(^|(?<=\n))-\s(.*?)\n/g;

		return description.replace(regex, '[ ] - $2\n');
	}
</script>

<!--name-->
<Input class="flex-1" autocomplete="off" placeholder="Name" bind:value={taskIn.value.name} />

<!--image-->
<Collapsable title="Image">
	<TaskFormImage />
</Collapsable>

<!--description-->
<Collapsable title="Description">
	<label class="block text-sm text-gray-700">
		<textarea
			class="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			oninput={(e) => (taskIn.value.description = formatSubTasks(e.currentTarget.value))}
			placeholder="Create subtasks for this task using bullet points with `-`. Fill in the boxes to mark them as completed."
			value={taskIn.value.description}
		></textarea>
	</label>
</Collapsable>

{#snippet categoryItem(category: Category)}
	<div class="flex items-center gap-3">
		<div class="{tailwindColorMap[category.color]?.darkBg} h-5 w-5 rounded-md"></div>
		{category.name}
	</div>
{/snippet}

<!--category-->
<Select
	class="flex items-center"
	label="Category"
	labelClass="w-1/5"
	selectClass="flex-1"
	bind:value={taskIn.value.category}
>
	{#snippet placeholder()}
		{@render categoryItem(taskIn.value.category)}
	{/snippet}
	{#each categories as category (category)}
		<SelectItem value={category}>
			{@render categoryItem(category)}
		</SelectItem>
	{/each}
</Select>

<!--goal-->
<Select
	class="flex items-center"
	label="Goal"
	labelClass="w-1/5"
	selectClass="flex-1"
	bind:value={taskIn.value.goal}
>
	{#snippet placeholder()}
		{taskIn.value.goal?.name || 'no goal'}
	{/snippet}
	<SelectItem value={null}>no goal</SelectItem>
	{#each goals as goal (goal)}
		<SelectItem class="flex gap-2" value={goal}>
			<GoalIcon name={goal.icon} class="h-5 w-5" />
			<span class="w-[calc(100%-20px)] truncate">{goal.name}</span>
		</SelectItem>
	{/each}
</Select>

<!--date AND duration-->
<div class="flex gap-3">
	<Input class="w-1/2" label="Date" type="date" bind:value={taskIn.value.date} />

	<Input
		class="w-1/2"
		label="Duration"
		oninput={(input) => (taskIn.value.endTime = sumTimes(taskIn.value.startTime, input))}
		required
		type="time"
		bind:value={taskIn.value.duration}
	/>
</div>
