<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import {
		done,
		long,
		normalWithoutDescription,
		redEvent,
		shortWithoutDescription,
	} from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventCell from './EventCell.svelte';

	export const meta = {
		argTypes: {},
		component: EventCell,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<EventCell>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-40 h-40 relative">
		<EventCell {...args} />
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="normal Without a Description" />

<Story args={{ event: shortWithoutDescription }} name="short Without a Description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: done }} name="Done" />

<Story args={{ event: redEvent }} name="Red event" />
