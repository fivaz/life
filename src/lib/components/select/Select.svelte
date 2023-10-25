<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronUpDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	
export let label: string = '';

	export let value: string | number | string[] | null | undefined;

	export let name: string;
</script>

<!--TODO use context API to pass data up and down in my calendar hierarchy-->

<Listbox bind:value>
	<input type="hidden" {name} {value} />
	{#if label}
		<ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{label}</ListboxLabel>
	{/if}
	<div class="relative mt-2">
		<ListboxButton
			class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
			<span class="block truncate">
				<slot name="placeholder" />
			</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Icon src={ChevronUpDown} class="h-5 w-5 text-gray-400" aria-hidden="true" />
			</span>
		</ListboxButton>
		<ListboxOptions
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			<slot />
		</ListboxOptions>
	</div>
</Listbox>
