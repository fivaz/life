<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MultiDatePicker from './MultiDatePicker.svelte';

	const { Story } = defineMeta({
		component: MultiDatePicker,
	});

	const value = $state([]);
</script>

<Story name="Primary" args={{ label: 'Label', value }} />
