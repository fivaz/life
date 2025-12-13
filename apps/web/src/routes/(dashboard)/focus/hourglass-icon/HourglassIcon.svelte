<script lang="ts">
	import { timer } from '$lib/components/timer/service.svelte.js';

	import AnimatedHourglassIcon from '../animated-hourglass-icon/AnimatedHourglassIcon.svelte';
	import StaticHourglassIcon from '../static-hourglass-icon/StaticHourglassIcon.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();
</script>

{#if timer.status === 'paused'}
	<StaticHourglassIcon class={klass} />
{:else if timer.status === 'running'}
	<AnimatedHourglassIcon class={klass} />
{/if}
