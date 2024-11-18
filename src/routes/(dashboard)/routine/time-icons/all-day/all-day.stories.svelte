<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AllDay from './AllDay.svelte';

	const { Story } = defineMeta({
		component: AllDay,
		args: {
			class: 'h-20 w-auto',
		},
	});
</script>

<Story args={{}} name="Primary" />
