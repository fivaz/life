<script lang="ts">
	import { IconRender, LInput } from '@life/shared';
	import type { Category } from '@life/shared/category';
	import { tailwindColorMap } from '@life/shared/category';
	import type { Goal } from '@life/shared/goal';
	import { getGoalsForTasks } from '@life/shared/goal';

	import { categories } from '$lib/category/category.svelte';
	import Collapsable from '$lib/components/collapsable/Collapsable.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import { goals as rawGoals } from '$lib/goal/goal.svelte';
	import { taskIn } from '$lib/task/task-form/service.svelte';
	import TaskFormImage from '$lib/task/task-form/task-form-image/TaskFormImage.svelte';
	import { sumTimes } from '$lib/task/time-utils';

	import TaskDescription from './TaskDescription.svelte';

	const goals = $derived(getGoalsForTasks(rawGoals.value));
</script>

<!--name-->
<LInput
	class="w-full"
	autocomplete="off"
	autofocus
	inputClass="w-full"
	placeholder="Name"
	bind:value={taskIn.value.name}
/>

<!--image-->
<Collapsable title="Image">
	<TaskFormImage />
</Collapsable>

<!--description-->
<Collapsable title="Description">
	<TaskDescription bind:content={taskIn.value.description} />
</Collapsable>

{#snippet categoryItem(category: Category)}
	<div class="flex items-center gap-3">
		<div class="{tailwindColorMap[category.color]?.darkBg} size-5 rounded-md"></div>
		<div class="w-[calc(100%-32px)] truncate">{category.name}</div>
	</div>
{/snippet}

<!--category-->
<Select
	class="flex items-center"
	label="Category"
	labelClass="w-1/5"
	selectClass="w-4/5"
	bind:value={taskIn.value.category}
>
	{#snippet placeholder()}
		{@render categoryItem(taskIn.value.category)}
	{/snippet}
	{#each categories.value as category (category)}
		<SelectItem value={category}>
			{@render categoryItem(category)}
		</SelectItem>
	{/each}
</Select>

{#snippet goalItem(goal: Goal | null)}
	<div class="flex items-center gap-3">
		{#if goal}
			<IconRender name={goal.icon} class="size-5" />
			<div class="w-[calc(100%-32px)] truncate">{goal.name}</div>
		{:else}
			<div>no goal</div>
		{/if}
	</div>
{/snippet}

<!--goal-->
<Select
	class="flex items-center"
	label="Goal"
	labelClass="w-1/5"
	selectClass="w-4/5"
	bind:value={taskIn.value.goal}
>
	{#snippet placeholder()}
		{@render goalItem(taskIn.value.goal)}
	{/snippet}
	<SelectItem value={null}>no goal</SelectItem>
	{#each goals as goal (goal)}
		<SelectItem class="flex gap-2" value={goal}>
			<IconRender name={goal.icon} class="size-5" />
			<span class="w-[calc(100%-32px)] truncate">{goal.name}</span>
		</SelectItem>
	{/each}
</Select>

<!--date AND duration-->
<div class="flex gap-3">
	<LInput
		class="w-1/2 flex-col"
		inputClass="w-full"
		label="Date"
		type="date"
		bind:value={taskIn.value.date}
	/>

	<LInput
		class="w-1/2 flex-col"
		inputClass="w-full"
		label="Duration"
		oninput={(input) => (taskIn.value.endTime = sumTimes(taskIn.value.startTime, input))}
		required
		type="time"
		bind:value={taskIn.value.duration}
	/>
</div>
