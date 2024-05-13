<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Portal from 'svelte-portal';

	export let show: boolean;

	const dispatch = createEventDispatcher();
</script>

{#if show}
	<Portal target="body">
		<div class="fixed inset-0 z-50 flex items-center justify-center">
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
			<div class="absolute inset-0 bg-black opacity-50" on:click={() => dispatch('close')} />

			<slot />
		</div>
	</Portal>
{/if}
