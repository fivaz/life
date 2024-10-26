<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Collapsable from './Collapsable.svelte';

	export const meta = {
		argTypes: {},
		component: Collapsable,
		parameters: {
			layout: 'fullscreen',
		},
	} satisfies Meta<Collapsable>;
</script>

<Template let:args>
	<Collapsable {...args} title="Test">
		<div class="h-96 w-96 bg-indigo-100"></div>
	</Collapsable>
</Template>

<Story args={{}} name="Primary" />
