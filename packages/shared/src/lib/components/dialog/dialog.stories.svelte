<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import Dialog from './Dialog.svelte';

	const { Story } = defineMeta({
		component: Dialog,
		render: template,
		args: {
			cancelText: 'Cancel',
			confirmText: 'Confirm',
			resolve: (value: boolean | null) => {
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

	type Args = ComponentProps<typeof Dialog>;
</script>

{#snippet template(args: Args)}
	<div>
		<Dialog {...args} />
	</div>
{/snippet}

<Story
	name="Primary"
	args={{
		cancelText: 'Custom Cancel',
		confirmText: 'Custom Confirm',
		message: 'Are you sure you want to delete this event ?',
		isOpen: true,
		title: 'Delete event ?',
	}}
/>

<Story
	name="No Message"
	args={{
		isOpen: true,
		title: 'Delete?',
	}}
/>
