<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { redEvent } from '$lib/task/seed';
	import { buildEmptyEventIn } from '../service';
	import { convertToEventIn } from '../service.js';
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

<script>
</script>

<Template let:args>
	<EventForm {...args} />
</Template>

<Story
	name="Create"
	args={{
		categories,
		form: null,
		event: buildEmptyEventIn(categories),
	}}
/>

<Story
	name="Edit"
	args={{
		categories,
		form: null,
		event: convertToEventIn(redEvent),
	}}
/>
