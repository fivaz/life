<script lang="ts">
	import type { TEvent } from '$lib';
	import { startOfWeek } from 'date-fns';

	import CalendarGrid from './calendar-grid/index.svelte';
	import CalendarHeader from './calendar-header/index.svelte';

	export let events: TEvent[];

	let currentDate = new Date();

	let weekStart = startOfWeek(currentDate);
</script>

<div class="flex h-full flex-col divide-gray-200">
	<CalendarHeader bind:weekStart {currentDate} />
	<CalendarGrid {weekStart} {currentDate} {events} />
</div>
