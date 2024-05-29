<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { TIME } from '$lib/consts';
	import { roundTo15 } from '$lib/task/time-utils';
	import { type AnyEvent, getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import GoalIcon from '../../../../../../../../routes/dashboard/goals/goal-form/goal-icon/GoalIcon.svelte';

	export let event: AnyEvent;
	export let targetDate: string;
	export let isSelected: boolean;

	$: duration = format(roundTo15(parse(event.duration, TIME, new Date())), TIME);

	const dispatch = createEventDispatcher<{
		toggleEvent: { event: AnyEvent; targetDate: string };
	}>();

	function isLong() {
		return getDurationInMinutes(event) > GRID_CELL_TIME;
	}

	function isMedium() {
		const duration = getDurationInMinutes(event);
		return duration >= GRID_CELL_TIME * 2 && duration < GRID_CELL_TIME * 3;
	}

	function getTitle() {
		let title = event.name;

		if (!isLong()) {
			if (event.subTasks?.length) {
				title += ` + ${event.subTasks.length}`;
			} else if (event.description) {
				title += '...';
			}
		}

		return title;
	}
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

	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions-->
	<label
		class={clsx('absolute right-0 top-0 flex p-[5px] pl-3', { 'pb-3': isLong() })}
		on:click|stopPropagation
	>
		<input
			checked={event.isDone}
			class="rounded border-gray-300 focus:ring-indigo-600"
			on:change={() => dispatch('toggleEvent', { event, targetDate })}
			type="checkbox"
		/>
	</label>

	{#if isLong()}
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
				{#if !isMedium()}
					<span> ({duration})</span>
				{/if}
			</div>
			<div class="text-pink-500 group-hover:text-pink-700">
				{#if event.subTasks?.length}
					<ul>
						{#each event.subTasks as subTask (subTask.id)}
							<li class={clsx({ 'line-through': subTask.isDone })}>
								- {subTask.name}
							</li>
						{/each}
					</ul>
				{:else}
					{event.description}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.group {
		scrollbar-width: none;
	}
</style>
