<script module lang="ts">
	import {
		type Args,
		defineMeta,
		setTemplate,
	} from '@storybook/addon-svelte-csf';

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

	import EventPanelCore from './EventPanelCore.svelte';

	const { Story } = defineMeta({
		component: EventPanelCore,
		args: {
			isSelected: false,
			targetDate: new Date().toISOString(),
		},
	});
</script>

<script>
	setTemplate(template);
</script>

{#snippet template({ event, ...args }: Args<typeof Story>)}
	<div class="relative h-48 w-48">
		<EventPanelCore {event} {...args} />
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
