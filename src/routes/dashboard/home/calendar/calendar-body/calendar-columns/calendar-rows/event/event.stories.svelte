<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import {
		done,
		long,
		normalWithoutDescription,
		shortWithoutDescription,
		redEvent,
	} from '$lib/task/seed';
	import Event from './Event.svelte';

	export const meta = {
		component: Event,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<Event>;
</script>

<script>
</script>

<Template let:args>
	<div class="w-40 h-40 relative">
		<Event {...args} />
	</div>
</Template>

<Story name="normal Without a Description" args={{ event: normalWithoutDescription }} />

<Story name="short Without a Description" args={{ event: shortWithoutDescription }} />

<Story name="Long" args={{ event: long }} />

<Story name="Done" args={{ event: done }} />

<Story name="Red event" args={{ event: redEvent }} />
