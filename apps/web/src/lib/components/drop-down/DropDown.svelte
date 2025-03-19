<script lang="ts">
	import type { ComputePositionReturn, Middleware, Placement } from '@floating-ui/dom';
	import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Copy } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		children: Snippet;
		class?: string;
		itemClass?: string;
		list: { label: string; onclick: () => void; icon?: typeof Copy }[];
		placement: Placement;
	}

	let { children, class: klass, placement, list, itemClass }: Props = $props();

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
		if (buttonEl.contains(event.target) || dropdownEl.contains(event.target)) return;
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

<div class="relative flex text-left">
	<button bind:this={buttonEl} class="w-full" onclick={toggleIsOpen} type="button">
		{@render children()}
	</button>

	{#if isOpen}
		<ul
			bind:this={dropdownEl}
			class="{klass} absolute z-10 divide-y divide-gray-300 rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-600 dark:bg-gray-800"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			{#each list as item}
				<li>
					<button
						class="{itemClass} focus-visible:outline-white-600 inline-flex w-full items-center justify-start gap-2 p-2 text-sm text-gray-900 shadow-sm hover:bg-gray-200 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-100 dark:hover:bg-gray-800"
						onclick={item.onclick}
					>
						{#if item.icon}
							<item.icon class="size-4" />
						{/if}
						{item.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
