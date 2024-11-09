<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Collapsable from './Collapsable.svelte';

	const { Story } = defineMeta({
		component: Collapsable,
	});
</script>

<Story args={{}} name="Primary">
	<div class="bg-gray-100 p-2">
		<div class="h-96 w-96">
			<Collapsable title="Test">
				<div class="h-28 w-full bg-red-100"></div>
			</Collapsable>
		</div>
	</div>
</Story>
