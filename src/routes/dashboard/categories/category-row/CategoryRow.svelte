<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let category: Category;

	let dispatch = createEventDispatcher<{ edit: Category; remove: Category }>();
</script>

<li
	class={clsx(
		tailwindColors[category.color].darkBg,
		'flex items-center justify-between gap-x-6 rounded-lg p-3',
	)}
>
	<div class="flex items-center gap-x-2">
		<div class="text-sm font-semibold leading-6 text-gray-50">{category.name}</div>
		{#if category.isDefault}
			<Icon class="h-6 w-6 text-white" src={CheckBadge} />
		{/if}
	</div>

	<div>
		<Button on:click={() => dispatch('edit', category)} type="button">
			<Icon class="h-4 w-4" src={Settings} />
		</Button>
	</div>
</li>
