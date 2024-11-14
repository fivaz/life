<script module lang="ts">
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import Dialog from './Dialog.svelte';

	const { Story } = defineMeta({
		component: Dialog,
		args: {
			cancelText: 'Cancel',
			confirmText: 'Confirm',
			resolve: (value) => {
				if (value === true) {
					console.log('accepted');
				} else if (value === false) {
					console.log('rejected');
				} else {
					console.log('cancel');
				}
			},
		},
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story> | any)}
	<Dialog {...args} />
{/snippet}

<Story
	args={{
		cancelText: 'Custom Cancel',
		confirmText: 'Custom Confirm',
		message: 'Are you sure you want to delete this event ?',
		isOpen: true,
		title: 'Delete event ?',
	}}
	name="Primary"
/>

<Story
	args={{
		isOpen: true,
		title: 'Delete?',
	}}
	name="No Message"
/>
