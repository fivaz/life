<script lang="ts">
	import { Check } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';

	let className = '';
	export { className as class };

	export let value: unknown;

	let isSelected: boolean = false;
</script>

<li
	class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
	data-value={value}
>
	<span class={clsx('truncate font-normal hover:font-semibold', className)}>
		<slot />
	</span>

	{#if isSelected}
		<span
			class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 hover:text-white"
		>
			<Icon aria-hidden="true" class="h-5 w-5" src={Check} />
		</span>
	{/if}
</li>
