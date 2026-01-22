<script lang="ts">
	import type { Category } from '@life/shared/category';
	import { tailwindColorMap } from '@life/shared/category';
	import { GripVerticalIcon, Settings2Icon, TagIcon } from '@lucide/svelte';
	import { dragHandle } from 'svelte-dnd-action';

	import CategoryFormButton from '../category-form-button/CategoryFormButton.svelte';

	interface Props {
		category: Category;
	}

	let { category }: Props = $props();
</script>

<li
	class="{tailwindColorMap[category.color].darkBg}
		flex items-center justify-between gap-x-2 rounded-lg px-3 py-2 text-sm leading-6 font-semibold text-white"
>
	<div aria-label="drag-handle for {category.name}" use:dragHandle>
		<GripVerticalIcon class="size-5" />
	</div>
	<TagIcon class="size-5 text-white" />
	<div class="flex-1 truncate text-sm leading-6 font-semibold">{category.name}</div>

	<CategoryFormButton
		class="{tailwindColorMap[category.color].hoverBg} {tailwindColorMap[category.color].hoverText}
				rounded-md text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset"
		{category}
		color="none"
	>
		<Settings2Icon class="size-5" />
	</CategoryFormButton>
</li>
