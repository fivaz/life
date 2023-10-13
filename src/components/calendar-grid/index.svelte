<script lang="ts">
	import CalendarColumns from '../calendar-columns/index.svelte';
	import CalendarTimeLabs from '../calendar-time-labels/index.svelte';

	let container: HTMLDivElement;
</script>

<div bind:this={container} class="isolate flex flex-auto flex-col overflow-auto bg-white">
	<div class="flex max-w-full flex-none sm:max-w-none md:max-w-full">
		<CalendarTimeLabs />
		<CalendarColumns />
	</div>
</div>
