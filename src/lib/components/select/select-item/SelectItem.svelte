<script lang="ts">
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';

	let className = '';
	export { className as class };

	export let value: string | number | string[] | null | undefined;
</script>

<ListboxOption {value} let:selected let:active>
	<li
		class={classnames(
			active ? 'bg-indigo-600 text-white' : 'text-gray-900',
			'relative cursor-default select-none py-2 pl-3 pr-9',
		)}
	>
		<span class={classnames(active ? 'font-semibold' : 'font-normal', 'block truncate', className)}>
			<slot />
		</span>

		{#if selected}
			<span
				class={classnames(
					active ? 'text-white' : 'text-indigo-600',
					'absolute inset-y-0 right-0 flex items-center pr-4',
				)}
			>
				<Icon src={Check} class="h-5 w-5" aria-hidden="true" />
			</span>
		{/if}
	</li>
</ListboxOption>
