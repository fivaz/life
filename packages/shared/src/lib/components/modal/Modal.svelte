<script lang="ts">
	import type { Snippet } from 'svelte';
	import { portal } from 'svelte-portal';

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

	// this makes sure that if there is a dialog on the screen, the only modal closed on Esc is the
	// one being used by the dialog, otherwise the modal not used by a dialog will be closed
	let isCloseableOnEsc = $derived(isDialog === dialog.value.show);

	function showBeClosed(event: KeyboardEvent) {
		if (!isOpen) return;

		if (event.key !== 'Escape') return;

		if (!isCloseableOnEsc) return;

		close();

		event.stopPropagation();
	}
</script>

<svelte:window onkeydown={showBeClosed} />

{#if isOpen}
	<div class="fixed inset-0 z-20 flex items-center justify-center" use:portal={'body'}>
		<button
			class="absolute inset-0 bg-black opacity-50"
			aria-label="modal background"
			onclick={close}
		></button>
		{@render children()}
	</div>
{/if}
