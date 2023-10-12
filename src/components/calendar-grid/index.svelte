<script lang="ts">
	import CalendarNav from '../calendar-nav/index.svelte';
	import CalendarTimeLabs from '../calendar-time-labels/index.svelte';

	let container: HTMLDivElement;
</script>

<div bind:this={container} class="isolate flex flex-auto flex-col overflow-auto bg-white">
	<div style="width: 165%" class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
		<CalendarTimeLabs />
		<CalendarNav />
	</div>
</div>
