<script lang="ts">
	import { borderColors } from '@life/shared/colors';
	import { formatDate } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { isTimed } from '@life/shared/task';
	import { onMount } from 'svelte';

	import { isScrollingUp } from '../service.svelte.js';
	import CalendarGrid from './calendar-grid/CalendarGrid.svelte';
	import { SUMMARY_GRID_CELL_HEIGHT } from './calendar-grid/service.svelte.js';
	import EventPanel from './event-panel/EventPanel.svelte';
	import type { EventsGrid } from './event-panel/placement-service.js';
	import { getEventGrid, getTasksForDate } from './service.js';
	import TasksSummary from './tasks-summary/TasksSummary.svelte';

	interface Props {
		date: Date;
		create: (time: string) => void;
		tasks: Task[];
		class?: string;
	}

	let { tasks, date, create, class: klass }: Props = $props();

	let formattedDate = $derived<string>(formatDate(date));

	let tasksOnDate = $derived<Task[]>(getTasksForDate(tasks, date));

	let timedTasks = $derived<Task[]>(tasksOnDate.filter((task) => isTimed(task)));

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
	<div
		bind:this={container}
		style="height: {SUMMARY_GRID_CELL_HEIGHT}px"
		class="relative border-b {borderColors.light}"
	>
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
