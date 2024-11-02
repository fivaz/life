<script module lang="ts">
	import EventPanelCore from './EventPanelCore.svelte';
	import {
		longRecurring,
		normalWithDescription,
		normalWithSubTasks,
		normalWithoutDescriptionWithGoal,
		normalWithoutDescriptionWithoutGoal,
		shortWithDescription,
		shortWithSubTasks,
		shortWithoutDescription,
	} from '$lib/task/seed';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: EventPanelCore,
	});
</script>

{#snippet template(args: any)}
	<div class="relative h-48 w-48">
		<EventPanelCore isSelected={false} targetDate={new Date()} {...args} />
	</div>
{/snippet}

<Story
	args={{ event: normalWithoutDescriptionWithGoal }}
	name="Normal without description with goal"
	children={template}
/>

<Story
	args={{ event: normalWithoutDescriptionWithoutGoal }}
	name="Normal without description without goal"
	children={template}
/>

<Story
	args={{ event: normalWithDescription }}
	name="Normal with a description"
	children={template}
/>

<Story args={{ event: normalWithSubTasks }} name="Normal with sub tasks" children={template} />

<Story
	args={{ event: shortWithoutDescription }}
	name="Short without description"
	children={template}
/>

<Story args={{ event: shortWithDescription }} name="Short with a description" children={template} />

<Story args={{ event: shortWithSubTasks }} name="Short with sub tasks" children={template} />

<Story args={{ event: longRecurring }} name="Long recurring" children={template} />
