<script lang="ts">
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import { events } from '$lib/store/events';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData | null = null;
	export let data: PageData;
</script>

<ol>
	{#each data.categories as category (category)}
		<li>{category.name}</li>
	{/each}
</ol>
