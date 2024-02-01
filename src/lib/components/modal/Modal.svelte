<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show: boolean;

	const dispatch = createEventDispatcher();
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div
			on:keydown={(e) => {
				if (e.key === 'Esc') {
					dispatch('close');
				}
			}}
			tabindex="0"
			role="button"
			class="absolute inset-0 bg-black opacity-50"
			on:click={() => dispatch('close')}
		/>

		<div class="relative">
			<slot />
		</div>
	</div>
{/if}
