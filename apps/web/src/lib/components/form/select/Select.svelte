<script lang="ts">
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	import { setSelectValue } from '$lib/components/form/select/service';

	interface Props {
		label?: string;
		value: unknown;
		class?: string;
		labelClass?: string;
		selectClass?: string;
		placeholder: Snippet;
		children: Snippet;
	}

	let {
		label = '',
		value = $bindable(),
		class: klass,
		labelClass,
		selectClass,
		placeholder,
		children,
	}: Props = $props();

	let isOpen = $state<boolean>(false);
	let list = $state<HTMLDivElement | null>(null);
	let button = $state<HTMLButtonElement | null>(null);
	let listId = 'select-list-' + Math.random().toString(36).substring(2, 11);
	let focusedIndex = $state<number>(-1);

	function selectItem(event: MouseEvent | KeyboardEvent) {
		const li = (event.target as HTMLElement).closest('li');
		if (!li) return;

		const valueString = li.getAttribute('data-value');
		if (!valueString) return;

		value = JSON.parse(valueString);
		isOpen = false;
		focusedIndex = -1;
	}

	function toggleIsOpen() {
		isOpen = !isOpen;
		if (isOpen) {
			// Schedule focus for the next microtask
			setTimeout(() => {
				focusedIndex = 0;
			}, 0);
		} else {
			focusedIndex = -1;
		}
	}

	function closeOnClickOutside(event: MouseEvent) {
		if (!isOpen) return;
		if (!(event.target instanceof HTMLElement)) return;
		if (!list) return;
		if (list.contains(event.target)) return;

		isOpen = false;
		focusedIndex = -1;
	}

	function handleKeyDown(event: KeyboardEvent) {
		const items = list?.querySelectorAll('li');
		if (!items) return;

		// Define the type for our key actions
		type KeyActionMap = {
			[key: string]: () => void;
		};

		const keyActions: KeyActionMap = {
			ArrowDown: () => {
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % items.length;
			},
			ArrowUp: () => {
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + items.length) % items.length;
			},
			Enter: () => {
				event.preventDefault();
				if (focusedIndex >= 0) items[focusedIndex].click();
			},
			' ': () => {
				// Space bar
				event.preventDefault();
				if (focusedIndex >= 0) items[focusedIndex].click();
			},
			Escape: () => {
				event.preventDefault();
				isOpen = false;
				focusedIndex = -1;
				button?.focus();
			},
			Tab: () => {
				isOpen = false;
				focusedIndex = -1;
			},
		};

		// Handle closed state
		if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
			event.preventDefault();
			isOpen = true;
			focusedIndex = 0;
			return;
		}

		// Execute the action for the pressed key
		const action = keyActions[event.key];
		if (action) action();
	}

	onMount(() => {
		document.addEventListener('click', closeOnClickOutside);
		return () => {
			document.removeEventListener('click', closeOnClickOutside);
		};
	});

	$effect(() => {
		setSelectValue(value);
	});

	$effect(() => {
		if (isOpen && focusedIndex >= 0) {
			const items = list?.querySelectorAll('li');
			if (items && items[focusedIndex]) {
				// Focus the item
				(items[focusedIndex] as HTMLElement).focus();
				// Scroll into view if needed
				items[focusedIndex].scrollIntoView({ block: 'nearest' });
			}
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
	bind:this={list}
	class={clsx(klass, 'text-sm font-medium text-gray-700 dark:text-gray-300')}
	aria-controls={listId}
	aria-expanded={isOpen}
	aria-label={label || 'Select an option'}
	onkeydown={handleKeyDown}
	role="combobox"
>
	<!-- Fallback for screen readers -->
	{#if label}
		<label class={labelClass} for="select-button">{label}</label>
	{/if}
	<div class={clsx(selectClass, 'relative')}>
		<button
			bind:this={button}
			id="select-button"
			class="relative w-full cursor-default rounded-md bg-gray-100 py-1.5 pr-10 pl-3 text-left text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:outline-hidden sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
			aria-haspopup="listbox"
			onclick={toggleIsOpen}
			type="button"
		>
			<span class="block truncate">{@render placeholder()}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<ChevronDownIcon class="size-5 text-gray-400" aria-hidden="true" />
			</span>
		</button>
		{#if isOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<ul
				id={listId}
				class="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-hidden sm:text-sm dark:bg-gray-950 dark:scheme-dark"
				onclick={selectItem}
				role="listbox"
			>
				{@render children()}
			</ul>
		{/if}
	</div>
</div>
