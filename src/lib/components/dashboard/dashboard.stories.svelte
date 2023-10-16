<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import Dashboard from './Dashboard.svelte';

	export const meta = {
		component: Dashboard,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered'
		},
		argTypes: {}
	} satisfies Meta<Dashboard>;
</script>

<Template let:args>
	<Dashboard {...args} />
</Template>

<Story name="With Calendar" args={{}}>
	<Dashboard>
		<Calendar form={null} />
	</Dashboard>
</Story>

<Story name="Empty" args={{}}>
	<Dashboard>
		<div class="h-96 rounded-lg border-4 border-dashed border-gray-200" />
	</Dashboard>
</Story>
