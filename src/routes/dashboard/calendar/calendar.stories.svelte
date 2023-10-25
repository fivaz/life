<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Calendar from './Calendar.svelte';

	export const meta = {
		component: Calendar,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<Calendar>;
</script>

<Template let:args>
	<div class="w-[800px] h-[800px]">
		<Calendar {...args} />
	</div>
</Template>

<Story name="Primary" args={{}} />
