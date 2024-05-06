<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanelCore from './EventPanelCore.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanelCore,
	} satisfies Meta<EventPanelCore>;
</script>

<script>
	import {
		longRecurring,
		normalWithDescription,
		normalWithSubTasks,
		normalWithoutDescription,
		shortWithDescription,
		shortWithSubTasks,
		shortWithoutDescription,
	} from '$lib/task/seed';
</script>

<Template let:args>
	<div class="relative h-48 w-48">
		<EventPanelCore
			{...args}
			isSelected={false}
			on:toggleEvent={(args) => console.log('toggleEvent', args.detail)}
			targetDate={new Date()}
		/>
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="Normal without description" />

<Story args={{ event: normalWithDescription }} name="Normal with a description" />

<Story args={{ event: normalWithSubTasks }} name="Normal with sub tasks" />

<Story args={{ event: shortWithoutDescription }} name="Short without description" />

<Story args={{ event: shortWithDescription }} name="Short with a description" />

<Story args={{ event: shortWithSubTasks }} name="Short with sub tasks" />

<Story args={{ event: longRecurring }} name="Long recurring" />
