<script module lang="ts">
	import TaskFormEvent from './TaskFormEvent.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskFormEvent,
	});
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormEvent />
	</div>
</Story>
