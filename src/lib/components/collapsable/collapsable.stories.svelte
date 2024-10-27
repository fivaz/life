<script module lang="ts">
	import Collapsable from './Collapsable.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: Collapsable,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary">
	<Collapsable title="Test">
		<div class="h-96 w-96 bg-indigo-100"></div>
	</Collapsable>
</Story>
