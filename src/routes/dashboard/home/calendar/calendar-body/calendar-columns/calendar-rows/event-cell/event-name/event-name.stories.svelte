<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { normalWithoutDescription } from '$lib/task/seed';
	import EventName from './EventName.svelte';

	export const meta = {
		component: EventName,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<EventName>;
</script>

<Template let:args>
	<EventName {...args} />
</Template>

<Story name="Primary" args={{ event: normalWithoutDescription }} />
