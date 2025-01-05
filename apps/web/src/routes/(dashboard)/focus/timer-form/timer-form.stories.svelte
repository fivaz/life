<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TimerForm from './TimerForm.svelte';

	const { Story } = defineMeta({
		component: TimerForm,
		parameters: {
			layout: 'fullscreen',
		},
	});

	let time = $state<number>(30 * 60);
</script>

<Story name="Primary" args={{ time }} />
