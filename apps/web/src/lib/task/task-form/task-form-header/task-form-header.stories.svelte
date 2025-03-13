<script lang="ts" module>
	import { longRecurring } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TaskFormDropDown from './TaskFormDropDown.svelte';

	const { Story } = defineMeta({
		component: TaskFormDropDown,
	});
</script>

<Story name="Primary" args={{}}>
	<div class="rounded-lg bg-indigo-100 p-2">
		<div class="w-80 rounded-lg bg-white p-5">
			<TaskFormDropDown close={() => console.log('close')} task={longRecurring} />
		</div>
	</div>
</Story>
