<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import DesktopDialog from './DesktopDialog.svelte';

	const { Story } = defineMeta({
		component: DesktopDialog,
		render: template,
		args: {
			cancelText: 'Cancel',
			confirmText: 'Confirm',
		},
	});
</script>

{#snippet template(args: ComponentProps<typeof DesktopDialog>)}
	<DesktopDialog {...args} />
{/snippet}

<Story
	name="Primary"
	args={{
		cancelText: 'Custom Cancel',
		confirmText: 'Custom Confirm',
		message: 'Are you sure you want to delete this event ?',
		title: 'Delete event ?',
	}}
/>

<Story
	name="No Message"
	args={{
		title: 'Delete?',
	}}
/>
