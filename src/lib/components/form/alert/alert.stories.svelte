<script module lang="ts">
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { Snippet } from 'svelte';

	import Alert from './Alert.svelte';

	const { Story } = defineMeta({
		component: Alert,
		argTypes: {
			children: { control: 'text' },
		},
	});

	// TODO check what is their solution for this
	const textAsSnippet = (text: string) => text as unknown as Snippet;
</script>

<script lang="ts">
	setTemplate(template);
</script>

<!--TODO check their solution for this-->
{#snippet template(args: Args<typeof Story> | any)}
	<Alert {...args}>{args.children}</Alert>
{/snippet}

<Story
	args={{
		isVisible: true,
		type: 'success',
		close: () => console.log('close'),
		children: textAsSnippet('Successfully uploaded'),
	}}
	name="Success"
/>

<Story
	args={{
		isVisible: true,
		type: 'info',
		close: () => console.log('close'),
		children: textAsSnippet('A new software update is available. See what’s new in version 2.0.4'),
	}}
	name="Info"
/>

<Story
	args={{
		isVisible: true,
		type: 'warning',
		close: () => console.log('close'),
		children: textAsSnippet('You have no credits left'),
	}}
	name="Warning"
/>

<Story
	args={{
		isVisible: true,
		type: 'error',
		close: () => console.log('close'),
		children: textAsSnippet('There were 2 errors with your submission'),
	}}
	name="Error"
/>
