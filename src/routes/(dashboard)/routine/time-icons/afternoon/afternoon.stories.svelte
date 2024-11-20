<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Afternoon from './Afternoon.svelte';

	const { Story } = defineMeta({
		component: Afternoon,
		args: {
			class: 'h-20 w-auto',
		},
	});
</script>

<Story name="Primary" args={{}} />
