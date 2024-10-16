<script lang="ts">
	import { onMount } from 'svelte';

	import CalendarColumns from './calendar-columns/CalendarColumns.svelte';
	import HorizontalTime from './horizontal-time/HorizontalTime.svelte';
	import WeekList from './week-list/WeekList.svelte';

	let container: HTMLDivElement | null = null;
	let containerNav: HTMLDivElement | null = null;
	let containerOffset: HTMLDivElement | null = null;

	onMount(() => {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		if (!container || !containerNav || !containerOffset) {
			return;
		}

		container.scrollTop =
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
			1440;
	});
</script>

<div
	bind:this={container}
	class="isolate flex flex-auto flex-col overflow-auto border-b border-l bg-white"
>
	<div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 md:pr-8"
		>
			<WeekList />
		</div>

		<div class="flex h-full w-full">
			<HorizontalTime>
				<div bind:this={containerOffset} />
			</HorizontalTime>
			<CalendarColumns on:persistToDos on:toggleEvent />
		</div>
	</div>
</div>
