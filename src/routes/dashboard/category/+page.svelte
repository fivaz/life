<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import CategoryRow from './category-row/CategoryRow.svelte';

	export let form: ActionData | null = null;
	export let data: PageData;
</script>

<ul role="list" class="divide-y divide-gray-100">
	{#each data.categories as category (category)}
		<CategoryRow {category} />
	{/each}
</ul>
