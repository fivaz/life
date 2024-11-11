<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

import WeekList from './WeekList.svelte';

	const { Story } = defineMeta({
		component: WeekList,
	});
</script>

<Story args={{}} name="Primary" />
