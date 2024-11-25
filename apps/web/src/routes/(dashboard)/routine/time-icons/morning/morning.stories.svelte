<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Morning from './Morning.svelte';

	const { Story } = defineMeta({
		component: Morning,
		args: {
			class: 'h-20 w-auto',
		},
	});
</script>

<Story name="Primary" args={{}} />
