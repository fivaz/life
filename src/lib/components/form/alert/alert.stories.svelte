<script module lang="ts">
	import Alert from './Alert.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Alert,
	});
</script>

{#snippet template(args: any)}
	<Alert {...args}>{args.children}</Alert>
{/snippet}

<Story
	args={{
		isVisible: true,
		type: 'success',
		close: () => console.log('close'),
		children: 'Successfully uploaded',
	}}
	name="Success"
	children={template}
/>

<Story
	args={{
		isVisible: true,
		type: 'info',
		close: () => console.log('close'),
		children: 'A new software update is available. See what’s new in version 2.0.4',
	}}
	name="Info"
	children={template}
/>

<Story
	args={{
		isVisible: true,
		type: 'warning',
		close: () => console.log('close'),
		children: 'You have no credits left',
	}}
	name="Warning"
	children={template}
/>

<Story
	args={{
		isVisible: true,
		type: 'error',
		close: () => console.log('close'),
		children: 'There were 2 errors with your submission',
	}}
	name="Error"
	children={template}
/>
