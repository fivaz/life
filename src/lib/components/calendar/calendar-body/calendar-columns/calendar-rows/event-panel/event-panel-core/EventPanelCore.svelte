<script lang="ts">
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import { getContext } from 'svelte';

	import { tailwindColors } from '$lib/category/utils';
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service.svelte';
	import { TIME } from '$lib/consts';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import { roundTo15 } from '$lib/task/time-utils';
	import { getCompletedTasks, getDurationInMinutes, getSubTasks, type Task } from '$lib/task/utils';

	interface Props {
		event: Task;
		targetDate: string;
		isSelected: boolean;
	}

	let { event, targetDate, isSelected }: Props = $props();
	// format date from this format '01:15' to this format '1h15min'
	function formattedDuration() {
		const date = roundTo15(parse(event.duration, TIME, new Date()));

		const hours = format(date, 'H');
		const minutes = format(date, 'mm');

		let formattedTime = '';

		if (hours !== '0') {
			formattedTime += `${hours}h`;
		}

		if (minutes !== '00') {
			formattedTime += `${minutes}min`;
		}

		return formattedTime;
	}

	function isLong() {
		return getDurationInMinutes(event) > GRID_CELL_TIME;
	}

	function getTitle() {
		let title = event.name;

		const subtasks = getSubTasks(event);

		if (subtasks?.length) {
			const completedTasks = getCompletedTasks(subtasks);

			title += ` + ${completedTasks}/${subtasks.length}`;
		} else if (event.description) {
			title += '...';
		}

		return title;
	}

	const toggleEvent = getContext('toggleEvent');
</script>

<div
	class={clsx(
		'group absolute inset-px select-none overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5',
		{
			'border-1 touch-none border border-black': isSelected,
		},
		tailwindColors[event.category.color].text,
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverLightBg,
	)}
>
	<div class="flex items-center gap-1">
		{#if event.goal?.icon}
			<GoalIcon class="h-4 w-4" name={event.goal.icon} />
		{/if}
		<span class="truncate pr-3 font-semibold">
			{getTitle()}
		</span>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<label
		class={clsx('absolute right-0 top-0 flex p-[5px] pl-3', { 'pb-3': isLong() })}
		onclick={(e) => e.stopPropagation()}
	>
		<input
			checked={event.isDone}
			class="rounded border-gray-300 focus:ring-indigo-600"
			onchange={() => toggleEvent(event, targetDate)}
			type="checkbox"
		/>
	</label>

	<div class="overflow-hidden">
		<div>
			<time
				class="{tailwindColors[event.category.color].lightText} {tailwindColors[
					event.category.color
				].hoverText}"
				dateTime={`${event.date}T${event.startTime}`}
			>
				{format(parse(event.startTime, TIME, new Date()), 'p')}
			</time>
			<span> ({formattedDuration()})</span>
		</div>
		<div class="whitespace-pre text-pink-500 group-hover:text-pink-700">
			{event.description}
		</div>
	</div>
</div>

<style>
	.group {
		scrollbar-width: none;
	}
</style>
