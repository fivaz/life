<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import AllDay from './AllDay.svelte';

	const { Story } = defineMeta({
		component: AllDay,
		args: {
			class: 'h-20 w-20',
		},
	});
</script>

<Story name="Primary" args={{}} />
