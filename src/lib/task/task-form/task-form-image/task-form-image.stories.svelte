<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormImage from './TaskFormImage.svelte';

	const { Story } = defineMeta({
		component: TaskFormImage,
	});
</script>

<Story args={{}} name="Primary">
	<div class="w-72">
		<TaskFormImage file={null} />
	</div>
</Story>
