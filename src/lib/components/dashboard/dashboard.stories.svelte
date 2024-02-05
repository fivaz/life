<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Calendar from '../../../routes/dashboard/home/calendar/Calendar.svelte';
	import Dashboard from './Dashboard.svelte';

	export const meta = {
		argTypes: {},
		component: Dashboard,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Dashboard>;
</script>

<Template let:args>
	<Dashboard {...args} />
</Template>

<Story args={{}} name="With Calendar">
	<Dashboard>
		<Calendar />
	</Dashboard>
</Story>

<Story args={{}} name="Empty">
	<Dashboard>
		<div class="h-96 rounded-lg border-4 border-dashed border-gray-200" />
	</Dashboard>
</Story>
