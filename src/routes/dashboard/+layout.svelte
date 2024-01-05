<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '$lib/category/store.js';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import { events } from '$lib/event/store.js';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	events.set(data.events);
	categories.set(data.categories);
</script>

<Dashboard session={$page.data.session}>
	<slot />
</Dashboard>
