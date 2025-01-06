<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RoutineIcon from './RoutineIcon.svelte';

	const { Story } = defineMeta({
		component: RoutineIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story args={{}} name="Primary"/>
