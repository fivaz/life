<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Dialog from './Dialog.svelte';

	export const meta = {
		component: Dialog,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Dialog>;
</script>

<Template let:args>
	<Dialog
		{...args}
		on:close={() => console.log('close')}
		on:confirm={() => console.log('confirm')}
		on:cancel={() => console.log('cancel')}
	/>
</Template>

<Story
	name="Primary"
	args={{
		show: true,
		title: 'Delete event ?',
		message: 'Are you sure you want to delete this event ?',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
	}}
/>

<Story
	name="No Message"
	args={{
		show: true,
		title: 'Delete?',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
	}}
/>
