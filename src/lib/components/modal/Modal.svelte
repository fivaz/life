<script lang="ts">
	import Portal from 'svelte-portal';
	import type { Snippet } from 'svelte';
	import { dialog } from '$lib/components/dialog/service.svelte';

	interface Props {
		isOpen: boolean;
		children: Snippet;
		close?: () => void;
		isDialog?: boolean;
	}

	let {
		isDialog = false,
		isOpen = $bindable(),
		close = () => (isOpen = false),
		children,
	}: Props = $props();

	function showBeClosed(event: KeyboardEvent) {
		if (!isOpen) return;

		if (event.key !== 'Escape') return;

		//make sure that a Modal is only closed on Esc if there isn't a dialog open
		if (!isDialog && !dialog.value.show) {
			close();
			return;
		}

		// in case the dialog is open close it
		if (isDialog && dialog.value.show) {
			close();
		}
	}
</script>

<svelte:window onkeydown={showBeClosed} />

{#if isOpen}
	<Portal target="body">
		<div class="fixed inset-0 z-20 flex items-center justify-center">
			<button
				aria-label="modal background"
				class="absolute inset-0 bg-black opacity-50"
				onclick={close}
			></button>
			{@render children()}
		</div>
	</Portal>
{/if}
