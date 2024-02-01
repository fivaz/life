<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import Input from '$lib/components/input/Input.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import type { TaskIn } from '$lib/components/task-form/service';

	export let targetDate: Date | null;

	export let categories: Category[];

	export let task: TaskIn;

	export let data: Pick<TaskIn, 'goal' | 'category'>;

	$: categoryName = 'create a category first';
	// [].find((category) => category.id === task.categoryId)?.name || 'create a category first';

	$: goalName = 'no goal';
	// $: goalName = [].find((goal) => goal.id === task.goalId)?.name || 'no goal';
</script>
