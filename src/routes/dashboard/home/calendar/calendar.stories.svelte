<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';

	export const meta = {
		argTypes: {},
		component: Calendar,
		parameters: {
			layout: 'centered',
		},
		tags: ['autodocs'],
	} satisfies Meta<Calendar>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<Calendar {...args} />
	</div>
</Template>

<Story args={{}} name="Primary" />
