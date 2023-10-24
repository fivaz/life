<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxLabel
	} from '@rgossiaux/svelte-headlessui';
	
export let label: string = '';

	export let placeholder: string | null = null;

	export let value: string | number;
</script>

<!--TODO use context API to pass data up and down in my calendar hierarchy-->

<Listbox bind:value>
	{#if label}
		<ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{label}</ListboxLabel>
	{/if}
	<div class="relative mt-2">
		<ListboxButton
			class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
			<!--			<pre>-->

			<!--			{JSON.stringify($$slots, null, 2)}-->
			<!--			</pre>-->

			<!--{$$slots || placeholder}-->
		</ListboxButton>
		<ListboxOptions
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			<slot />
		</ListboxOptions>
	</div>
</Listbox>
