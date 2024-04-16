<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Dialog from './Dialog.svelte';

	export const meta = {
		component: Dialog,
	} satisfies Meta<Dialog>;
</script>

<Template let:args>
	<Dialog
		{...args}
		on:cancel={() => console.log('cancel')}
		on:close={() => console.log('close')}
		on:confirm={() => console.log('confirm')}
	/>
</Template>

<Story
	args={{
		cancelText: 'Cancel',
		confirmText: 'Confirm',
		message: 'Are you sure you want to delete this event ?',
		show: true,
		title: 'Delete event ?',
	}}
	name="Primary"
/>

<Story
	args={{
		cancelText: 'Cancel',
		confirmText: 'Confirm',
		show: true,
		title: 'Delete?',
	}}
	name="No Message"
/>
