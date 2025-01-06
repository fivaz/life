<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import RoutineIcon from './RoutineIcon.svelte';

	const { Story } = defineMeta({
		component: RoutineIcon,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
