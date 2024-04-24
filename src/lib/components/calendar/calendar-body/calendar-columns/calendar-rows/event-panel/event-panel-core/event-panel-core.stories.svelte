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
		done,
		funEvent,
		long,
		normalWithoutDescription,
		shortWithoutDescription,
		sleepRecurringEvent,
	} from '$lib/task/seed';
</script>

<Template let:args>
	<div class="relative h-48 w-48">
		<EventPanelCore {...args} />
	</div>
</Template>

<Story args={{ event: done }} name="Done" />

<Story args={{ event: normalWithoutDescription }} name="Normal without description" />

<Story args={{ event: shortWithoutDescription }} name="Short without a description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: sleepRecurringEvent }} name="Recurring" />

<Story args={{ event: funEvent }} name="Fun" />
