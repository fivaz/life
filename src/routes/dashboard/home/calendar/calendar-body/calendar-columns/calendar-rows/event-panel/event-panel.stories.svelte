<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import {
		done,
		long,
		normalWithoutDescription,
		redEvent,
		shortWithoutDescription,
	} from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import EventPanel from './EventPanel.svelte';

	export const meta = {
		argTypes: {},
		component: EventPanel,
	} satisfies Meta<EventPanel>;
</script>

<Template let:args>
	<div class="w-40 h-40 relative">
		<EventPanel {...args} />
	</div>
</Template>

<Story args={{ event: normalWithoutDescription }} name="normal Without a Description" />

<Story args={{ event: shortWithoutDescription }} name="short Without a Description" />

<Story args={{ event: long }} name="Long" />

<Story args={{ event: done }} name="Done" />

<Story args={{ event: redEvent }} name="Red event" />
