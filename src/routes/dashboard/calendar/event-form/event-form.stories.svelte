<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { redEvent } from '$lib/event/seed';
	import EventForm from './EventForm.svelte';

	export const meta = {
		component: EventForm,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<EventForm>;
</script>

<Template let:args>
	<EventForm {...args} />
</Template>

<Story
	name="Create"
	args={{
		categories,
		form: null,
	}}
/>

<Story
	name="Edit"
	args={{
		categories,
		form: {
			saved: redEvent,
		},
	}}
/>
