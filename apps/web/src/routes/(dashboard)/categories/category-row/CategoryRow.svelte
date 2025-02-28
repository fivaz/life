<script lang="ts">
	import { tailwindColorMap } from '@life/shared/category';
	import { Settings2, Tag } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { GripVertical } from 'lucide-svelte';
	import { dragHandle } from 'svelte-dnd-action';

	import type { Category } from '$lib/category/category.model';

	interface Props {
		category: Category;
		edit: (category: Category) => void;
	}

	let { category, edit }: Props = $props();
</script>

<li
	class="{tailwindColorMap[category.color].darkBg}
		flex items-center justify-between gap-x-2 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div aria-label="drag-handle for {category.name}" use:dragHandle>
		<GripVertical class="h-5 w-5" />
	</div>
	<Icon class="h-5 w-5 text-white" src={Tag} />
	<div class="flex-1 truncate text-sm font-semibold leading-6">{category.name}</div>

	<button
		class="{tailwindColorMap[category.color].hoverBg} {tailwindColorMap[category.color].hoverText}
				 rounded px-1.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300"
		onclick={() => edit(category)}
		type="button"
	>
		<Icon class="h-5 w-5" src={Settings2} />
	</button>
</li>
