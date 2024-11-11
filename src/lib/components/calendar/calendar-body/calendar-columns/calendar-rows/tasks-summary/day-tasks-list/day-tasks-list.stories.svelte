<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ToDoList from './DayTasksList.svelte';

	const { Story } = defineMeta({
		component: ToDoList,
	});

	</script>

<Story args={{ tasks: [], close: () => console.log('close'), date: new Date() }} name="Primary" />
