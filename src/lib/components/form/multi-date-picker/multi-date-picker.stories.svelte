<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MultiDatePicker from './MultiDatePicker.svelte';

	const { Story } = defineMeta({
		component: MultiDatePicker,
	});

	const value = $state([]);
</script>

<Story args={{ label: 'Label', value }} name="Primary" />
