<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import { tailwindColors } from '$lib/category/utils';
	import { CheckBadge, EllipsisHorizontal } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let category: Category;

	let dispatch = createEventDispatcher<{ edit: Category; remove: Category }>();
</script>

<li
	class={clsx(
		tailwindColors[category.color].darkBg,
		'flex justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-50',
	)}
>
	<div class="flex items-center gap-x-2">
		<div class="text-sm font-semibold leading-6 text-gray-50">{category.name}</div>
		{#if category.isDefault}
			<Icon class="h-6 w-6 text-white" src={CheckBadge} />
		{/if}
	</div>

	<div>
		<button
			class={clsx(
				tailwindColors[category.color].hoverBg,
				'rounded px-1.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300',
			)}
			on:click={() => dispatch('edit', category)}
			type="button"
		>
			<Icon class="h-4 w-4 text-white" src={EllipsisHorizontal} />
		</button>
	</div>
</li>
