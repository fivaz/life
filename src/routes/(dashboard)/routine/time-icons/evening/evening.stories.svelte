<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Evening from './Evening.svelte';

	const { Story } = defineMeta({
		component: Evening,
		args: {
			class: 'h-20 w-auto',
		},
	});
</script>

<Story args={{}} name="Primary" />
