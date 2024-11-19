<script lang="ts">
	import type { Snippet } from 'svelte';

	import { type Category, categorySchema } from '$lib/category/category.model';
	import DBCollection from '$lib/components/db-collection/DBCollection.svelte';
	import { DB_PATH } from '$lib/consts';

	interface Props {
		data: Snippet<[Category[], string]>;
	}

	let { data: typedData }: Props = $props();

	let categoryType: Category;
</script>

<DBCollection schema={categorySchema} collection={DB_PATH.CATEGORIES} type={categoryType}>
	{#snippet data(items, userId)}
		{@render typedData(items, userId)}
	{/snippet}
</DBCollection>
