<script lang="ts">
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { type Snippet } from 'svelte';

	interface Props {
		class?: string;
		value: unknown;
		isSelected: boolean;
		children?: Snippet;
	}

	let { class: klass = '', value, isSelected, children }: Props = $props();
</script>

<li
	class="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
	data-value={JSON.stringify(value)}
>
	<span class={clsx('truncate font-normal group-hover:font-semibold', klass)}>
		{@render children?.()}
	</span>

	{#if isSelected}
		<span
			class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white"
		>
			<Icon aria-hidden="true" class="h-5 w-5 group-hover:text-white" src={Check} />
		</span>
	{/if}
</li>
