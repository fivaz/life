<script lang="ts">
	import type { AnyEvent } from '$lib/task/utils';

	import NewCalendarGrid from '$lib/components/new-calendar/new-calendar-body/new-calendar-columns/new-calendar-rows/new-calendar-grid/NewCalendarGrid.svelte';

	export let events: AnyEvent[];
</script>

<div class="text-2xl font-bold">
	<NewCalendarGrid></NewCalendarGrid>
</div>
