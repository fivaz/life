<script lang="ts">
	import { auth, db } from '$lib/firebase';
	import { FirebaseApp } from 'sveltefire';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { pwaInfo } from 'virtual:pwa-info';

	import '../app.css';

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta content={pwaAssetsHead.themeColor.content} name="theme-color" />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>

<FirebaseApp {auth} firestore={db}>
	<slot />
</FirebaseApp>
