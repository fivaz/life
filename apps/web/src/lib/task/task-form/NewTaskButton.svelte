<script lang="ts">
	import type { Snippet } from 'svelte';

	import { categories } from '$lib/category/category.svelte';
	import { buildUntimedTask } from '$lib/task/build-utils';
	import TaskFormButton from '$lib/task/task-form/TaskFormButton.svelte';

	interface Props {
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none' | 'dark' | 'light';
		class?: string;
		padding?: string;
	}

	let { children, color, class: klass, padding }: Props = $props();

	let newTask = $derived(buildUntimedTask(categories.value));
</script>

<TaskFormButton class={klass} {children} {color} {padding} task={newTask} />
