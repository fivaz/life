<script lang="ts">
	import { events } from '$lib/event/store';
	import type { ActionData, PageData } from './$types';
	import Calendar from './calendar/Calendar.svelte';

	export let form: ActionData | null = null;
	export let data: PageData;

	events.set(data.events);
</script>

<Calendar {form} categories={data.categories} />
