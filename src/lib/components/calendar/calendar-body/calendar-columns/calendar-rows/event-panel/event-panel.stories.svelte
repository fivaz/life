<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { done, long, normalWithoutDescription, shortWithoutDescription } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanel from './EventPanel.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanel,
		parameters: {
			layout: 'centered',
		},
	} satisfies Meta<EventPanel>;
</script>

<Template let:args>
	<div class="!relative w-52">
		<EventPanel {...args} class="!static" />
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="normal Without a Description" />

<Story args={{ event: shortWithoutDescription }} name="short Without a Description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: done }} name="Done" />
