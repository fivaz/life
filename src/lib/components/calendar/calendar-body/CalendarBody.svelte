<script lang="ts">
	import { onMount } from 'svelte';

	import CalendarWeekView from '$lib/components/calendar/calendar-body/calendar-week-view/CalendarWeekView.svelte';
	import { isScrollingUp } from '$lib/components/calendar/calendar-body/calendar-week-view/service.svelte';
	import type { Task } from '$lib/task/utils';

	import HorizontalTime from './horizontal-time/HorizontalTime.svelte';
	import WeekList from './week-list/WeekList.svelte';

	interface Props {
		tasks: Task[];
	}

	let { tasks }: Props = $props();

	let container = $state<HTMLDivElement | null>(null);
	let containerNav = $state<HTMLDivElement | null>(null);
	let containerOffset = $state<HTMLDivElement | null>(null);

	let ticking = $state(false);

	let lastScrollPosition = $state(0);

	function scrollToTime() {
		// Set the container scroll position based on the current time.
		const currentMinute = new Date().getHours() * 60;
		if (!container || !containerNav || !containerOffset) return;

		container.scrollTop =
			((container.scrollHeight - containerNav.offsetHeight - containerOffset.offsetHeight) *
				currentMinute) /
			1440;
	}

	function detectScroll() {
		if (!container) return;

		container.addEventListener('scroll', () => {
			if (!container) return;
			const currentScrollPosition = container.scrollTop;

			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (!container) return;

					isScrollingUp.value = lastScrollPosition > currentScrollPosition;
					lastScrollPosition = currentScrollPosition;
					ticking = false;
				});

				ticking = true;
			}
		});
	}

	onMount(() => {
		scrollToTime();
		detectScroll();
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
				<div bind:this={containerOffset}></div>
			</HorizontalTime>
			<CalendarWeekView {tasks} />
		</div>
	</div>
</div>
