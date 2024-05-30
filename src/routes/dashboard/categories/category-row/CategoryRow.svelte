<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import { tailwindColors } from '$lib/category/utils';
	import {} from '@steeze-ui/heroicons';
	import { Check, Settings2, Tag } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';

	export let category: Category;

	let dispatch = createEventDispatcher<{ edit: Category; remove: Category }>();
</script>

<li
	class="{tailwindColors[category.color]
		.darkBg} flex justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div class="flex items-center gap-x-2">
		<Icon class="h-5 w-5 text-white" src={Tag} />
		<div class="text-sm font-semibold leading-6">{category.name}</div>
		{#if category.isDefault}
			<Icon class="h-6 w-6 text-white" src={Check} />
		{/if}
	</div>

	<div>
		<button
			class="{tailwindColors[category.color].hoverBg} {tailwindColors[category.color]
				.hoverText} rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
			on:click={() => dispatch('edit', category)}
			type="button"
		>
			<Icon class="h-4 w-4" src={Settings2} />
		</button>
	</div>
</li>
