<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { normalWithoutDescription } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventName from './EventName.svelte';

	export const meta = {
		component: EventName,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<EventName>;
</script>

<Template let:args>
	<EventName {...args} />
</Template>

<Story args={{ event: normalWithoutDescription }} name="Primary" />
