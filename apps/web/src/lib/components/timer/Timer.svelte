<script lang="ts">
	import { timer } from '$lib/components/timer/service.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();

	let minutes = $derived<number>(Math.floor(timer.value / 60));
	let seconds = $derived<number>(timer.value % 60);
</script>

<span class={klass}>
	{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
</span>
