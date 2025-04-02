<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';
	import { getContext } from 'svelte';

	interface Props {
		class?: string;
		value: unknown;
		children: Snippet;
	}

	let { class: klass = '', value, children }: Props = $props();

	let selectedValue = getContext('selectedValue');

	let valueString = JSON.stringify(value);
</script>

<li
	class="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white dark:text-gray-100"
	aria-selected={JSON.stringify(selectedValue) === valueString}
	data-value={valueString}
	role="option"
>
	<span class={clsx('truncate font-normal group-hover:font-semibold', klass)}>
		{@render children()}
	</span>

	{#if JSON.stringify(selectedValue) === valueString}
		<span
			class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white"
		>
			<Check class="size-5 group-hover:text-white" aria-hidden="true" />
		</span>
	{/if}
</li>
