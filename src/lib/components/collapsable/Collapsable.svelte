<script lang="ts">
	

import { ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let title: string;

	let isOpen: boolean = false;
</script>

<div class="rounded-lg bg-white p-2">
	<button class="flex w-full justify-between" on:click={() => (isOpen = !isOpen)}>
		<span>{title}</span>
		<Icon class="h-5 w-5 {isOpen ? 'rotate-90 transform' : ''}" src={ChevronRight} />
	</button>
	{#if isOpen}
		<!--		<Transition-->
		<!--			class="overflow-hidden transition-all duration-500"-->
		<!--			enterFrom="transform opacity-0 max-h-0"-->
		<!--			enterTo="transform opacity-100 max-h-36"-->
		<!--			leaveFrom="transform opacity-100 max-h-36"-->
		<!--			leaveTo="transform opacity-0 max-h-0"-->
		<!--		>-->
		<div class="flex flex-col gap-2 pt-2 text-gray-500">
			<slot />
		</div>
		<!--		</Transition>-->
	{/if}
</div>
