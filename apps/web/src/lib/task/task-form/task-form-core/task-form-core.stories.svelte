<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormCore from './TaskFormCore.svelte';

	const { Story } = defineMeta({
		component: TaskFormCore,
	});
</script>

<Story name="Primary" args={{}}>
	<div class="rounded-lg bg-indigo-100 p-2">
		<div class="w-80 rounded-lg bg-white p-5">
			<TaskFormCore />
		</div>
	</div>
</Story>
