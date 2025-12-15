<script lang="ts">
	import type { Middleware, Placement } from '@floating-ui/dom';
	import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		children: Snippet;
		button: Snippet;
		class?: string;
		placement?: Placement;
		closeAfterClick?: boolean;
	}

	let { children, button, class: klass, placement, closeAfterClick = true }: Props = $props();

	let isOpen = $state(false); // Start closed for better UX
	let buttonEl = $state<HTMLButtonElement | null>(null);
	let dropdownEl = $state<HTMLUListElement | null>(null);

	// Function to update dropdown position
	async function updatePosition() {
		if (!buttonEl || !dropdownEl) return;
		const middleware: Middleware[] = [
			offset(6), // Add some space between button and dropdown
			flip(), // Flip to the opposite side if there's not enough space
			shift(), // Shift the dropdown if needed
		];

		const { x, y } = await computePosition(buttonEl, dropdownEl, {
			placement,
			middleware,
		});

		// Apply positioning
		Object.assign(dropdownEl.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	// Handle click outside to close dropdown
	function handleClickOutside(event: MouseEvent) {
		if (!isOpen || !buttonEl || !dropdownEl || !(event.target instanceof HTMLElement)) return;

		if (buttonEl.contains(event.target)) return;

		if (!closeAfterClick && dropdownEl.contains(event.target)) return;

		isOpen = false;
	}

	onMount(() => {
		// Add click outside listener
		document.addEventListener('click', handleClickOutside);

		// Auto-update position when open (handles resize, scroll, etc.)
		let cleanup: (() => void) | undefined;
		if (buttonEl && dropdownEl) {
			cleanup = autoUpdate(buttonEl, dropdownEl, updatePosition);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
			if (cleanup) cleanup();
		};
	});

	function toggleIsOpen() {
		isOpen = !isOpen;
		if (isOpen) {
			// Update position when opening
			setTimeout(updatePosition, 0); // Ensure DOM is ready
		}
	}
</script>

<div class="relative flex">
	<button bind:this={buttonEl} class="w-full {klass}" onclick={toggleIsOpen} type="button">
		{@render button()}
	</button>

	{#if isOpen}
		<ul
			bind:this={dropdownEl}
			class="ring-opacity-5 absolute z-10 divide-y divide-gray-300 rounded-md bg-gray-100 shadow-lg ring-1 ring-gray-300 focus:outline-hidden dark:divide-gray-600 dark:bg-gray-800 dark:ring-gray-700"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			{@render children()}
		</ul>
	{/if}
</div>
