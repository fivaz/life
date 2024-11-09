<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import HorizontalTime from './HorizontalTime.svelte';

	const { Story } = defineMeta({
		component: HorizontalTime,
	});
</script>

<Story args={{}} name="Primary">
	<HorizontalTime><div></div></HorizontalTime>
</Story>
