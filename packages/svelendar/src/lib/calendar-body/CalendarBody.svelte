<script lang="ts">
	import type { Task } from '@life/shared/task';
	import { onMount } from 'svelte';

	import CalendarWeekView from './calendar-week-view/CalendarWeekView.svelte';
	import { isScrollingUp } from './calendar-week-view/service.svelte.js';
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
	class="isolate flex flex-auto flex-col overflow-auto dark:[color-scheme:dark]"
>
	<div class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
		<div
			bind:this={containerNav}
			class="sticky top-0 z-30 flex-none border-b bg-gray-50 shadow-sm md:pr-8 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
		>
			<WeekList />
		</div>

		<div class="flex size-full bg-white dark:bg-gray-800">
			<HorizontalTime>
				<div bind:this={containerOffset}></div>
			</HorizontalTime>
			<CalendarWeekView {tasks} />
		</div>
	</div>
</div>
