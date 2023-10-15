<script lang="ts">
	import { events } from '$lib/store/events';
	import Calendar from '../components/calendar/Calendar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	events.set(data.events);
</script>

<Calendar />
