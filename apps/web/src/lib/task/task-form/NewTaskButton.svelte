<script lang="ts">
	import type { Task } from '@life/shared/task';
	import type { Snippet } from 'svelte';

	import { categories } from '$lib/category/category.svelte';
	import { buildUntimedTask } from '$lib/task/build-utils';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';

	interface Props {
		targetDate?: string;
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none' | 'dark' | 'light';
		class?: string;
		padding?: string;
	}

	let { children, color, class: klass, padding }: Props = $props();

	let newTask = $state<Task>(buildUntimedTask([]));

	$effect(() => {
		newTask = buildUntimedTask(categories.value);
	});
</script>

<TaskFormButton class={klass} {children} {color} {padding} task={newTask} />
