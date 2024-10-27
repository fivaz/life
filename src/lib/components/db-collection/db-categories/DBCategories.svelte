<script lang="ts">
	import type { Category } from '$lib/category/utils';
	import { DB_PATH } from '$lib/consts';

	import type { Snippet } from 'svelte';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';

	interface Props {
		data: Snippet<[Category[], string]>;
	}

	let { data: typedData }: Props = $props();

	let categoryType: Category;
</script>

<DBCollection segment={DB_PATH.CATEGORIES} type={categoryType}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
