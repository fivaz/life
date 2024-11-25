<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormImage from './TaskFormImage.svelte';

	const { Story } = defineMeta({
		component: TaskFormImage,
	});
</script>

<Story name="Primary" args={{}}>
	<div class="w-72">
		<TaskFormImage file={null} />
	</div>
</Story>
