<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import CalendarRows from './CalendarRows.svelte';

	export const meta = {
		component: CalendarRows,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<CalendarRows>;
</script>

<Template let:args>
	<div class="h-96 w-24">
		<CalendarRows {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		date: new Date(),
	}}
/>
