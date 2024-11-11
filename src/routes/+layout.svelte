<script lang="ts">
	import '../app.css';

	import type { Snippet } from 'svelte';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { pwaInfo } from 'virtual:pwa-info';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}

	<title>Life</title>

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>

{@render children()}
