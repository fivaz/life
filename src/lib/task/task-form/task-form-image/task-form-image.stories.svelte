<script module lang="ts">
	import TaskFormImage from './TaskFormImage.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: TaskFormImage,
	});
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormImage file={null} />
	</div>
</Story>
