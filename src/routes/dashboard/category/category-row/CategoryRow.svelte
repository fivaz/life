<script lang="ts">
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { CCategory } from '$lib/category/utils';
	import Button from '$lib/components/button/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let category: CCategory;

	let dispatch = createEventDispatcher<{ edit: CCategory; remove: CCategory }>();
</script>

<li class="flex justify-between gap-x-6 py-3">
	<div class="text-sm font-semibold leading-6 text-gray-900">{category.name}</div>

	<div>
		<Button on:click={() => dispatch('edit', category)} type="button">
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
	</div>
</li>
