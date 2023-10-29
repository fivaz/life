<script lang="ts">
	import CalendarColumns from './calendar-columns-mobile/CalendarColumnsMobile.svelte';
	import CalendarColumnsMobile from './calendar-columns/CalendarColumns.svelte';
	import CalendarTimeLabels from './calendar-time-labels/CalendarTimeLabels.svelte';

	export let weekStart: Date;
</script>

<div class="isolate flex h-full flex-col overflow-auto bg-white">
	<div class="flex h-full max-w-full flex-none sm:max-w-none md:max-w-full divide-x">
		<CalendarTimeLabels />

		<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
			<CalendarColumns {weekStart} on:edit on:create class="block sm:hidden" />
			<CalendarColumnsMobile {weekStart} on:edit on:create class="hidden sm:block" />
		</div>
	</div>
</div>
