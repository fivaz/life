<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineHeader from './RoutineHeader.svelte';

	const { Story } = defineMeta({
		component: RoutineHeader,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
