<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';
	import type { ComponentProps, Snippet } from 'svelte';

	import Alert from './Alert.svelte';

	const { Story } = defineMeta({
		component: Alert,
		argTypes: {
			children: { control: 'text' },
		},
		args: {
			isVisible: true,
			close: () => console.log('close'),
		},
	});

	// TODO check what is their solution for this
	const textAsSnippet = (text: string) => text as unknown as Snippet;
</script>

<script lang="ts">
	setTemplate(template as any);
</script>

<!--TODO check their solution for this-->
{#snippet template({ children, ...args }: ComponentProps<typeof Alert>)}
	<Alert {...args}>{children}</Alert>
{/snippet}

<Story
	name="Success"
	args={{
		type: 'success',
		children: textAsSnippet('Successfully uploaded'),
	}}
/>

<Story
	name="Info"
	args={{
		type: 'info',
		children: textAsSnippet('A new software update is available. See what’s new in version 2.0.4'),
	}}
/>

<Story
	name="Warning"
	args={{
		type: 'warning',
		children: textAsSnippet('You have no credits left'),
	}}
/>

<Story
	name="Error"
	args={{
		type: 'error',
		children: textAsSnippet('There were 2 errors with your submission'),
	}}
/>
