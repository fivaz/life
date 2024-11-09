<script lang="ts">
	import TasksSummary from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/tasks-summary/TasksSummary.svelte';
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';

	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { SUMMARY_GRID_CELL_HEIGHT } from './calendar-grid/service.svelte';
	import EventPanel from './event-panel/EventPanel.svelte';
	import { getEventGrid, getTasksForDate } from './service';
	import type { Task } from '$lib/task/utils';
	import { isScrollingUp } from '$lib/components/calendar/calendar-body/calendar-columns/service.svelte';
	import { onMount } from 'svelte';
	import { isTimed } from '$lib/task/utils.js';

	interface Props {
		date: Date;
		create: (time: string) => void;
		tasks: Task[];
		class?: string;
	}

	let { tasks, date, create, class: klass }: Props = $props();

	let formattedDate = $derived(format(date, DATE));

	let tasksOnDate = $derived(getTasksForDate(tasks, date));

	let timedTasks = $derived(tasksOnDate.filter((task) => isTimed(task)));

	let eventsGrid = $derived(getEventGrid(timedTasks));

	let container = $state<HTMLDivElement | null>(null);

	let containerWidth = $state(0);

	let ticking = $state(false);

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
	<div bind:this={container} class="relative border-b" style="height: {SUMMARY_GRID_CELL_HEIGHT}px">
		<TasksSummary
			{date}
			style="width: {containerWidth}px"
			class="{klass} {isScrollingUp.value ? 'fixed' : ''}
			z-10 w-full justify-center shadow ring-1 ring-black ring-opacity-5"
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
