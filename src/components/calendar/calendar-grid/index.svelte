<script lang="ts">
	import CalendarColumns from './calendar-columns/index.svelte';
	import CalendarTimeLabs from './calendar-time-labels/index.svelte';

	export let weekStart: Date;
	export let currentDate: Date;
</script>

<div class="isolate flex h-full flex-col overflow-auto bg-white">
	<div class="flex h-full max-w-full flex-none sm:max-w-none md:max-w-full divide-x">
		<CalendarTimeLabs />
		<CalendarColumns {weekStart} {currentDate} />
	</div>
</div>
