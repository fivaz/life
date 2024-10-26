<script context="module" lang="ts">
	import ToDoList from './DayTasksList.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: ToDoList,
	});
</script>

<script>
	import { toDos } from '$lib/task/seed';
</script>

<Story args={{ toDos }} name="Primary" />
