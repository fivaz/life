<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import EventForm from './EventForm.svelte';

	export const meta = {
		component: EventForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<EventForm>;
</script>

<Template let:args>
	<EventForm {...args} />
</Template>

<Story name="Primary" args={{}} />
