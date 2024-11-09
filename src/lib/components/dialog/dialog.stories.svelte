<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dialog from './Dialog.svelte';

	const { Story } = defineMeta({
		component: Dialog,
	});
</script>

{#snippet template(args: any)}
	<Dialog
		{...args}
		cancel={() => console.log('cancel')}
		close={() => console.log('close')}
		confirm={() => console.log('confirm')}
	/>
{/snippet}

<Story
	args={{
		cancelText: 'Cancel',
		confirmText: 'Confirm',
		message: 'Are you sure you want to delete this event ?',
		show: true,
		title: 'Delete event ?',
	}}
	name="Primary"
	children={template}
/>

<Story
	args={{
		cancelText: 'Cancel',
		confirmText: 'Confirm',
		show: true,
		title: 'Delete?',
	}}
	name="No Message"
	children={template}
/>
