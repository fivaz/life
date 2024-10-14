<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Alert from './Alert.svelte';

	export const meta = {
		component: Alert,
	} satisfies Meta<Alert>;
</script>

<Template let:args>
	<Alert {...args} />
</Template>

<Story
	args={{
		isVisible: true,
		type: 'success',
	}}
	let:args
	name="Success"
	on:close={() => console.log('close')}
>
	<Alert {...args}>Successfully uploaded</Alert>
</Story>

<Story
	args={{
		isVisible: true,
		type: 'info',
	}}
	let:args
	name="Info"
	on:close={() => console.log('close')}
>
	<Alert {...args}>A new software update is available. See what’s new in version 2.0.4.</Alert>
</Story>

<Story
	args={{
		isVisible: true,
		type: 'warning',
	}}
	let:args
	name="Warning"
	on:close={() => console.log('close')}
>
	<Alert {...args}>You have no credits left</Alert>
</Story>

<Story
	args={{
		isVisible: true,
		type: 'error',
	}}
	let:args
	name="Error"
	on:close={() => console.log('close')}
>
	<Alert {...args}>There were 2 errors with your submission</Alert>
</Story>
