<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Notification from './Notification.svelte';

	export const meta = {
		component: Notification,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Notification>;
</script>

<Template let:args>
	<div class="w-96 h-96">
		<Notification {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		show: true,
	}}
/>
