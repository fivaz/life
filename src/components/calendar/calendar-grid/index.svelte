<script lang="ts">
	import type { TEvent } from '$lib';
	import CalendarColumns from './calendar-columns/index.svelte';
	import CalendarTimeLabs from './calendar-time-labels/index.svelte';

	export let events: TEvent[];

	export let weekStart: Date;
	export let currentDate: Date;
</script>

<div class="isolate flex h-full flex-col overflow-auto bg-white">
	<div class="flex h-full max-w-full flex-none sm:max-w-none md:max-w-full">
		<CalendarTimeLabs />
		<CalendarColumns {weekStart} {currentDate} {events} />
	</div>
</div>
