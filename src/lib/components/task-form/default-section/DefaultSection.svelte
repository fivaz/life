<script lang="ts">
	import { categories } from '$lib/category/store';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import type { TaskIn } from '$lib/components/task-form/service';
	import { goals } from '$lib/goal/store';

	export let targetDate: Date | null;

	export let task: TaskIn;

	$: categoryName =
		$categories.find((category) => category.id === task.categoryId)?.name ||
		'create a category first';

	$: goalName = $goals.find((goal) => goal.id === task.goalId)?.name || 'no goal';
</script>

<input type="hidden" name="id" value={task.id} />
<input type="hidden" name="categoryName" value={categoryName} />
<input type="hidden" name="targetDate" value={targetDate?.toISOString() || null} />

<div class="flex gap-3 items-center">
	<Input class="flex-1" label="Name" autocomplete="off" name="name" bind:value={task.name} />

	<label>
		<input
			name="isDone"
			type="checkbox"
			bind:checked={task.isDone}
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
		/>
	</label>
</div>

<Select bind:value={task.categoryId} name="categoryId" label="Category">
	<span slot="placeholder">{categoryName}</span>
	{#each $categories as category (category)}
		<SelectItem value={category.id}>{category.name}</SelectItem>
	{/each}
</Select>

<Select bind:value={task.goalId} name="goalId" label="Goal">
	<span slot="placeholder">{goalName}</span>
	{#each $goals as goal (goal)}
		<SelectItem value={goal.id}>{goal.name}</SelectItem>
	{/each}
</Select>

<label class="block text-sm font-medium text-gray-700 mb-1">
	Description
	<textarea
		name="description"
		bind:value={task.description}
		class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	/>
</label>
