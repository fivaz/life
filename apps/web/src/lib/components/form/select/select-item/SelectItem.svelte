<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	import { getSelectValue } from '$lib/components/form/select/service';

	interface Props {
		class?: string;
		value: unknown;
		children: Snippet;
	}

	let { class: klass = '', value, children }: Props = $props();

	const { isSelected } = getSelectValue();

	let valueString = JSON.stringify(value);
</script>

<li
	class="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white dark:text-gray-100"
	aria-selected={isSelected(value)}
	data-value={valueString}
	role="option"
	tabindex="-1"
>
	<span class={clsx('truncate font-normal group-hover:font-semibold', klass)}>
		{@render children()}
	</span>

	{#if isSelected(value)}
		<span
			class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white"
		>
			<Check class="size-5 group-hover:text-white" aria-hidden="true" />
		</span>
	{/if}
</li>
