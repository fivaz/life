<script lang="ts">
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	let className = '';
	export { className as class };

	export let value: unknown;

	let convertedValue: null | number | string | string[] | undefined = value as string;
</script>

<ListboxOption let:active let:selected value={convertedValue}>
	<li
		class={clsx(
			active ? 'bg-indigo-600 text-white' : 'text-gray-900',
			'relative cursor-default select-none py-2 pl-3 pr-9',
		)}
	>
		<span class={clsx(active ? 'font-semibold' : 'font-normal', 'truncate', className)}>
			<slot />
		</span>

		{#if selected}
			<span
				class={clsx(
					active ? 'text-white' : 'text-indigo-600',
					'absolute inset-y-0 right-0 flex items-center pr-4',
				)}
			>
				<Icon aria-hidden="true" class="h-5 w-5" src={Check} />
			</span>
		{/if}
	</li>
</ListboxOption>
