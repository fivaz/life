<script lang="ts">
	import { tailwindColorMap } from '@life/shared/category';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { GripVerticalIcon, Settings2Icon, TagIcon } from 'lucide-svelte';
	import { dragHandle } from 'svelte-dnd-action';

	import type { Category } from '$lib/category/category.model';

	import CategoryForm from '../category-form/CategoryForm.svelte';

	interface Props {
		category: Category;
	}

	let { category }: Props = $props();
</script>

<li
	class="{tailwindColorMap[category.color].darkBg}
		flex items-center justify-between gap-x-2 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-white"
>
	<div aria-label="drag-handle for {category.name}" use:dragHandle>
		<GripVerticalIcon class="size-5" />
	</div>
	<TagIcon class="size-5 text-white" />
	<div class="flex-1 truncate text-sm font-semibold leading-6">{category.name}</div>

	<CategoryForm
		class="{tailwindColorMap[category.color].hoverBg} {tailwindColorMap[category.color].hoverText}"
		{category}
		color="none"
	>
		<Settings2Icon class="size-5" />
	</CategoryForm>
</li>
