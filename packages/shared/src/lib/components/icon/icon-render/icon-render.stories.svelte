<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import IconRender from './IconRender.svelte';

	const { Story } = defineMeta({
		component: IconRender,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{ name: 'Fire' }} />
