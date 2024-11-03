<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		component: Tooltip,
	});
</script>

<Story args={{ placement: 'left', class: 'text-red-500 bg-red-100' }} name="Primary">
	{#snippet children(args: any)}
		<Tooltip text="this is a tooltip" {...args}>
			<h1>Test</h1>
		</Tooltip>
	{/snippet}
</Story>
