<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import WeekChanger from './WeekChanger.svelte';

	const { Story } = defineMeta({
		component: WeekChanger
	});
</script>

<Story name="Primary" args={{ selectedDate: new Date() }} />
