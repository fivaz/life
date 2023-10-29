<script lang="ts">
	import { events } from '$lib/event/store';
	import { isEventOnDay } from '../calendar-rows/service';

	export let date: Date;

	$: dayEvents = $events.filter((event) => isEventOnDay(event, date));
</script>

<div class="text-2xl font-bold">Stats</div>
