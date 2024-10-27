<script module lang="ts">
	import HorizontalTime from './HorizontalTime.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: HorizontalTime,
	});
</script>

<Story args={{}} name="Primary">
	<HorizontalTime><div></div></HorizontalTime>
</Story>
