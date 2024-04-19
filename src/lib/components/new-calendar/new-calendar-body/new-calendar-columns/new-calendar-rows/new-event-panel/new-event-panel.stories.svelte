<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { done, long, normalWithoutDescription, shortWithoutDescription } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewEventPanel from './NewEventPanel.svelte';

	export const meta = {
		argTypes: {},
		component: NewEventPanel,
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<NewEventPanel>;
</script>

<Template let:args>
	<div class="w-52 !relative">
		<NewEventPanel {...args} class="!static" />
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="normal Without a Description" />

<Story args={{ event: shortWithoutDescription }} name="short Without a Description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: done }} name="Done" />
