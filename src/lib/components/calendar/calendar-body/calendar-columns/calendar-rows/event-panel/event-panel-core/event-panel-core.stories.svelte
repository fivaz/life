<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import {
		longRecurring,
		normalWithDescription,
		normalWithoutDescriptionWithGoal,
		normalWithoutDescriptionWithoutGoal,
		normalWithSubTasks,
		shortWithDescription,
		shortWithoutDescription,
		shortWithSubTasks,
	} from '$lib/task/seed';

	import EventPanelCore from './EventPanelCore.svelte';

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
