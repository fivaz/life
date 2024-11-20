<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormEvent from './TaskFormEvent.svelte';

	const { Story } = defineMeta({
		component: TaskFormEvent,
	});
</script>

<Story name="Primary" args={{}}>
	<div class="w-72">
		<TaskFormEvent />
	</div>
</Story>
