<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DbCollection from './DBCollection.svelte';

	const { Story } = defineMeta({
		component: DbCollection,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
