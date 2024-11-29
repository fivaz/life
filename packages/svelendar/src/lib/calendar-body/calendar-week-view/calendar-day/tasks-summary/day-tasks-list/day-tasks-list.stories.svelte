<script lang="ts" module>
	import { tasks } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ToDoList from './DayTasksList.svelte';

	const { Story } = defineMeta({
		component: ToDoList,
	});
</script>

<Story name="Primary" args={{ tasks, close: () => console.log('close'), date: new Date() }} />
