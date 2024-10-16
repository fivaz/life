<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

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
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanel from './EventPanel.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanel,
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<EventPanel>;
</script>

<Template let:args>
	<div class="!relative w-52">
		<EventPanel
			{...args}
			class="!static"
			on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
			targetDate={new Date()}
		/>
	</div>
</Template>

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
