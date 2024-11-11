<script lang="ts">
	import '../app.css';

	import { type Snippet } from 'svelte';

	import { dev } from '$app/environment';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	{#if !dev}
		<link rel="manifest" href="/manifest.json" />
	{/if}
</svelte:head>

{@render children()}
