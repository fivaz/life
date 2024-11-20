<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WeekList from './WeekList.svelte';

	const { Story } = defineMeta({
		component: WeekList,
	});
</script>

<Story name="Primary" args={{}} />
