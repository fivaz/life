<script lang="ts">
	import { addDays } from 'date-fns';
	import CalendarColumnsDesktop from './calendar-columns-desktop/CalendarColumnsDesktop.svelte';
	import CalendarColumnsMobile from './calendar-columns-mobile/CalendarColumnsMobile.svelte';

	export let weekStart: Date;

	$: dates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
</script>

<div class="h-full w-full bg-white text-sm leading-6 text-gray-500">
	<CalendarColumnsDesktop {dates} on:edit on:create class="hidden sm:block" />
	<CalendarColumnsMobile {dates} on:edit on:create class="block sm:hidden " />
</div>
