<script lang="ts">
	import { ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { setContext, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		label?: string;
		value: unknown;
		class?: string;
		labelClass?: string;
		selectClass?: string;
		placeholder?: Snippet;
		children?: Snippet;
	}

	let {
		label = '',
		value = $bindable(),
		class: klass = '',
		labelClass = '',
		selectClass = '',
		placeholder,
		children,
	}: Props = $props();

	let isOpen = $state<boolean>(false);

	function selectItem(event: MouseEvent) {
		const li = (event.target as HTMLElement).closest('li');
		if (!li) return;

		const valueString = li.getAttribute('data-value');
		if (!valueString) return;

		value = JSON.parse(valueString);

		isOpen = false;
	}

	$effect(() => {
		setContext('selectedValue', value);
	});
</script>

<div class={clsx(klass, 'text-sm font-medium text-gray-700')}>
	{#if label}
		<div class={labelClass}>
			{label}
		</div>
	{/if}
	<div class={clsx(selectClass, 'relative')}>
		<button
			class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			type="button"
			onclick={() => (isOpen = !isOpen)}
		>
			<span class="block truncate">
				{@render placeholder?.()}
			</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Icon aria-hidden="true" class="h-5 w-5 text-gray-400" src={ChevronUpDown} />
			</span>
		</button>
		{#if isOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<ul
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				onclick={selectItem}
			>
				{@render children?.()}
			</ul>
		{/if}
	</div>
</div>
