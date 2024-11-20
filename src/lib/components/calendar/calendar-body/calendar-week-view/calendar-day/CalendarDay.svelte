<script lang="ts">
	import { onMount } from 'svelte';

	import type { EventsGrid } from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/event-panel/placement-service';
	import TasksSummary from '$lib/components/calendar/calendar-body/calendar-week-view/calendar-day/tasks-summary/TasksSummary.svelte';
	import { isScrollingUp } from '$lib/components/calendar/calendar-body/calendar-week-view/service.svelte';
	import type { yyyyMMdd } from '$lib/date.utils.svelte.js';
	import { formatDate } from '$lib/date.utils.svelte.js';
	import type { CalendarTask, Task, TimedTask } from '$lib/task/task.model';
	import { isTimed } from '$lib/task/task.model.js';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { SUMMARY_GRID_CELL_HEIGHT } from './calendar-grid/service.svelte';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEventGrid, getTasksForDate } from './service';

	interface Props {
		date: Date;
		create: (time: string) => void;
		tasks: Task[];
		class?: string;
	}

	let { tasks, date, create, class: klass }: Props = $props();

	let formattedDate = $derived<yyyyMMdd>(formatDate(date));

	let tasksOnDate = $derived<CalendarTask[]>(getTasksForDate(tasks, date));

	let timedTasks = $derived<TimedTask[]>(tasksOnDate.filter((task) => isTimed(task)));

	let eventsGrid = $derived<EventsGrid>(getEventGrid(timedTasks));

	let container = $state<HTMLDivElement | null>(null);

	let containerWidth = $state<number>(0);

	let ticking = $state<boolean>(false);

	function updateContainerWidth() {
		if (!container) return;
		containerWidth = container.getBoundingClientRect().width;
	}

	onMount(() => {
		updateContainerWidth();

		window.addEventListener('resize', () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					updateContainerWidth();
					ticking = false;
				});

				ticking = true;
			}
		});
	});
</script>

<div>
	<div bind:this={container} style="height: {SUMMARY_GRID_CELL_HEIGHT}px" class="relative border-b">
		<TasksSummary
			style="width: {containerWidth}px"
			class="{klass} {isScrollingUp.value ? 'fixed' : ''}
			z-10 w-full justify-center shadow ring-1 ring-black ring-opacity-5"
			{date}
			tasks={tasksOnDate}
		/>
	</div>
	<div class="relative">
		<CalendarGrid {create} targetDate={formattedDate} />
		{#each timedTasks as event (event)}
			<EventPanel {event} {eventsGrid} targetDate={formattedDate} />
		{/each}
	</div>
</div>
