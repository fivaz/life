<script lang="ts">
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';
	import { onMount, setContext } from 'svelte';

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

	let listId = 'select-list-' + Math.random().toString(36).substring(2, 11);

	function selectItem(event: MouseEvent) {
		const li = (event.target as HTMLElement).closest('li');
		if (!li) return;

		const valueString = li.getAttribute('data-value');
		if (!valueString) return;

		value = JSON.parse(valueString);

		isOpen = false;
	}

	function toggleIsOpen() {
		isOpen = !isOpen;
	}

	function closeOnClickOutside(event: MouseEvent) {
		if (!isOpen) return;

		if (!(event.target instanceof HTMLElement)) return;

		if (!list) return;

		if (list.contains(event.target)) return;

		isOpen = false;
	}

	onMount(() => {
		document.addEventListener('click', closeOnClickOutside);
		return () => {
			document.removeEventListener('click', closeOnClickOutside);
		};
	});

	$effect(() => {
		setContext('selectedValue', value);
	});
</script>

<div
	bind:this={list}
	class={clsx(klass, 'text-sm font-medium text-gray-700 dark:text-gray-300')}
	aria-controls={listId}
	aria-expanded={isOpen}
	aria-label={label || 'Select an option'}
	role="combobox"
>
	<!-- Fallback for screen readers -->
	{#if label}
		<label class={labelClass} for="select-button">{label}</label>
	{/if}
	<div class={clsx(selectClass, 'relative')}>
		<button
			id="select-button"
			class="relative w-full cursor-default rounded-md bg-gray-100 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
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
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-950 dark:[color-scheme:dark]"
				onclick={selectItem}
				role="listbox"
			>
				{@render children()}
			</ul>
		{/if}
	</div>
</div>
