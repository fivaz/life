<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TimerForm from './TimerForm.svelte';

	const { Story } = defineMeta({
		component: TimerForm,
		parameters: {
			layout: 'fullscreen',
		},
	});

	let minutes = $state<number>(0);
	let seconds = $state<number>(0);
</script>

<Story name="Primary" args={{ minutes, seconds }} />
