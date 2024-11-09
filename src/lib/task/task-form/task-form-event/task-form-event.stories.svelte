<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormEvent from './TaskFormEvent.svelte';

	const { Story } = defineMeta({
		component: TaskFormEvent,
	});
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormEvent />
	</div>
</Story>
