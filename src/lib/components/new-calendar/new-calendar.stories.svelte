<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { events } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewCalendar from './NewCalendar.svelte';
	export const meta = {
		argTypes: {},
		component: NewCalendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewCalendar>;
</script>

<Template let:args>
	<div class="h-screen">
		<NewCalendar {...args} {events} />
	</div>
</Template>

<Story args={{}} name="Primary" />
