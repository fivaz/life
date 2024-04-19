<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show: boolean;

	const dispatch = createEventDispatcher();
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div
			class="absolute inset-0 bg-black opacity-50"
			on:click={() => dispatch('close')}
			on:keydown={(e) => {
				if (e.key === 'Esc') {
					dispatch('close');
				}
			}}
			role="button"
			tabindex="0"
		/>

		<div class="relative">
			<slot />
		</div>
	</div>
{/if}
