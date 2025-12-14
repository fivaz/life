<script lang="ts" module>
	import { longRecurring } from '@life/shared/task';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { taskIn } from '$lib/task/task-form/service.svelte';
	import { convertToTaskIn } from '$lib/task/task-in-utils';

	import DaysCheckbox from './DaysCheckbox.svelte';

	const { Story } = defineMeta({
		component: DaysCheckbox,
		render: template,
	});

	taskIn.value = convertToTaskIn(longRecurring);
</script>

{#snippet template()}
	<div class="rounded-lg bg-indigo-100 p-2">
		<div class="w-72 rounded-lg bg-white p-5">
			<DaysCheckbox />
		</div>
	</div>
{/snippet}

<Story name="Primary" args={{}} />
