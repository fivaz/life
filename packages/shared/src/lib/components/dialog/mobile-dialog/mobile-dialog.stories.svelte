<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';

	import MobileDialog from './MobileDialog.svelte';

	const { Story } = defineMeta({
		parameters: {
			layout: 'fullscreen',
		},
		component: MobileDialog,
		args: {
			cancelText: 'Cancel',
			confirmText: 'Confirm',
		},
	});
</script>

<script lang="ts">
	setTemplate(template as any);
</script>

{#snippet template(args: ComponentProps<typeof MobileDialog>)}
	<div class="h-screen">
		<MobileDialog {...args} />
	</div>
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
