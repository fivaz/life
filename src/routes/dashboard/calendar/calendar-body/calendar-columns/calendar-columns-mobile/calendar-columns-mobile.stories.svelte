<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { addDays } from 'date-fns';
	import CalendarColumns from './CalendarColumnsMobile.svelte';

	export const meta = {
		component: CalendarColumns,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<CalendarColumns>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<CalendarColumns {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		dates: Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)),
	}}
/>
