<script lang="ts">
	import CalendarColumns from './calendar-columns/CalendarColumns.svelte';
	import CalendarTimeLabels from './calendar-time-labels/CalendarTimeLabels.svelte';

	export let weekStart: Date;
</script>

<div class="isolate flex h-full flex-col overflow-auto bg-white">
	<div class="flex h-full max-w-full flex-none divide-x sm:max-w-none md:max-w-full">
		<CalendarTimeLabels />

		<CalendarColumns on:create on:edit {weekStart} />
	</div>
</div>
