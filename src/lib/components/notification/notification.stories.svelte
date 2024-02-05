<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Notification from './Notification.svelte';

	export const meta = {
		component: Notification,
		parameters: {
			layout: 'fullscreen',
		},
		tags: ['autodocs'],
	} satisfies Meta<Notification>;
</script>

<Template let:args>
	<div class="w-96 h-96">
		<Notification {...args} />
	</div>
</Template>

<Story
	args={{
		show: true,
	}}
	name="Primary"
/>
