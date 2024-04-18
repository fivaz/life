<script lang="ts">
	import NewCalendarHeader from '$lib/components/new-calendar/new-calendar-header/NewCalendarHeader.svelte';
	import NewWeekCalendarBody from '$lib/components/new-week-calendar/new-week-calendar-body/NewWeekCalendarBody.svelte';
</script>

<div class="flex h-full flex-col">
	<NewCalendarHeader />
	<NewWeekCalendarBody></NewWeekCalendarBody>
</div>
