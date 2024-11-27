<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import Dialog from './Dialog.svelte';

	const { Story } = defineMeta({
		component: Dialog,
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
			}
		}
	});
</script>

<script lang="ts">
	setTemplate(template as any);
</script>

{#snippet template(args: ComponentProps<typeof Dialog>)}
	<Dialog {...args} />
{/snippet}

<Story
	name="Primary"
	args={{
		cancelText: 'Custom Cancel',
		confirmText: 'Custom Confirm',
		message: 'Are you sure you want to delete this event ?',
		isOpen: true,
		title: 'Delete event ?'
	}}
/>

<Story
	name="No Message"
	args={{
		isOpen: true,
		title: 'Delete?'
	}}
/>
