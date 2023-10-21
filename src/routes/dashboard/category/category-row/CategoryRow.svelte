<script lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { CCategory } from '$lib/category/utils';
	import { createEventDispatcher } from 'svelte';

	export let category: CCategory;

	let dispatch = createEventDispatcher();
</script>

<li class="flex justify-between gap-x-6 py-5">
	<div class="text-sm font-semibold leading-6 text-gray-900">{category.name}</div>

	<button on:click={() => dispatch('edit', category)}>
		<Icon src={Settings} class="h-4 w-4" />
	</button>

	<button>
		<Icon src={Trash} class="h-4 w-4" />
	</button>
</li>
