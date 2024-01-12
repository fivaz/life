<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Alert from './Alert.svelte';

	export const meta = {
		component: Alert,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<Alert>;
</script>

<Template let:args>
	<Alert {...args} />
</Template>

<Story
	name="Success"
	args={{
		isVisible: true,
		type: 'success',
	}}
	on:close={() => console.log('close')}
	let:args
>
	<Alert {...args}>Successfully uploaded</Alert>
</Story>

<Story
	name="Info"
	args={{
		isVisible: true,
		type: 'info',
	}}
	on:close={() => console.log('close')}
	let:args
>
	<Alert {...args}>A new software update is available. See what’s new in version 2.0.4.</Alert>
</Story>

<Story
	name="Warning"
	args={{
		isVisible: true,
		type: 'warning',
	}}
	on:close={() => console.log('close')}
	let:args
>
	<Alert {...args}>You have no credits left</Alert>
</Story>

<Story
	name="Error"
	args={{
		isVisible: true,
		type: 'error',
	}}
	on:close={() => console.log('close')}
	let:args
>
	<Alert {...args}>There were 2 errors with your submission</Alert>
</Story>
