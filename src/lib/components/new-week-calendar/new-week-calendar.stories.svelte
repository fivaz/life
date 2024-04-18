<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import NewCalendar from '$lib/components/new-calendar/NewCalendar.svelte';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewWeekCalendar from './NewWeekCalendar.svelte';

	export const meta = {
		argTypes: {},
		component: NewWeekCalendar,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<NewWeekCalendar>;
</script>

<Template let:args>
	<div class="h-screen">
		<NewWeekCalendar {...args} />
	</div>
</Template>

<Story args={{}} name="Primary" />
