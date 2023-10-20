<script lang="ts">
	import Calendar from '$lib/components/calendar/Calendar.svelte';
	import { events } from '$lib/event/store';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData | null = null;
	export let data: PageData;

	events.set(data.events);
</script>

<Calendar {form} categories={data.categories} />
