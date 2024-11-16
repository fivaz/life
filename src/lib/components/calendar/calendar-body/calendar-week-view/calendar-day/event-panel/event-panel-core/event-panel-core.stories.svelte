<script module lang="ts">
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import {
		longRecurring,
		normalWithDescription,
		normalWithoutDescriptionWithGoal,
		normalWithoutDescriptionWithoutGoal,
		normalWithSubTasks,
		shortWithDescription,
		shortWithoutDescription,
		shortWithSubTasks,
	} from '$lib/task/task.seed';
	import { formatDate } from '$lib/utils.svelte';

	import EventPanelCore from './EventPanelCore.svelte';

	const { Story } = defineMeta({
		component: EventPanelCore,
		args: {
			isSelected: false,
			targetDate: formatDate(new Date()),
		},
	});
</script>

<script>
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story> | any)}
	<div class="relative h-48 w-48">
		<EventPanelCore {...args} />
	</div>
{/snippet}

<Story
	args={{ event: normalWithoutDescriptionWithGoal }}
	name="Normal without description with goal"
/>

<Story
	args={{ event: normalWithoutDescriptionWithoutGoal }}
	name="Normal without description without goal"
/>

<Story args={{ event: normalWithDescription }} name="Normal with a description" />

<Story args={{ event: normalWithSubTasks }} name="Normal with sub tasks" />

<Story args={{ event: shortWithoutDescription }} name="Short without description" />

<Story args={{ event: shortWithDescription }} name="Short with a description" />

<Story args={{ event: shortWithSubTasks }} name="Short with sub tasks" />

<Story args={{ event: longRecurring }} name="Long recurring" />
