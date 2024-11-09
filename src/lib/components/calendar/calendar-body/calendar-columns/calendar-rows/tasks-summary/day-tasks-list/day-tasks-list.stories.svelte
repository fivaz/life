<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ToDoList from './DayTasksList.svelte';

	const { Story } = defineMeta({
		component: ToDoList,
	});

	import { toDos } from '$lib/task/seed';
</script>

<Story args={{ toDos }} name="Primary" />
