<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { categories } from '$lib/category/seed';
	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';
	export const meta = {
		argTypes: {},
		component: Calendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Calendar>;
</script>

<Template let:args>
	<div class="h-screen">
		<Calendar {...args} {categories} {events} />
	</div>
</Template>

<Story args={{}} name="Primary" />
