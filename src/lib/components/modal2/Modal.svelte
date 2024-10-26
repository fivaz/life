<script lang="ts">
	import Portal from 'svelte-portal';
	import type { Snippet } from 'svelte';

	interface Props {
		isShown: boolean;
		children?: Snippet;
		close: () => void;
	}

	let { isShown, close, children }: Props = $props();
</script>

{#if isShown}
	<Portal target="body">
		<div class="fixed inset-0 z-20 flex items-center justify-center">
			<button
				aria-label="modal background"
				class="absolute inset-0 bg-black opacity-50"
				onclick={() => close()}
			></button>
			{@render children?.()}
		</div>
	</Portal>
{/if}
