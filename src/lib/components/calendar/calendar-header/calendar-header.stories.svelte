<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import CalendarHeader from './CalendarHeader.svelte';

	const { Story } = defineMeta({
		component: CalendarHeader,
		parameters: {
			layout: 'fullscreen',
		},
	});
</script>

<Story name="Primary" args={{}} />
