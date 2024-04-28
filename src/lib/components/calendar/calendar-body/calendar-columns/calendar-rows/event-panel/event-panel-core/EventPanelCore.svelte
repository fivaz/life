<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { TIME } from '$lib/consts';
	import { type AnyEvent, getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let event: AnyEvent;
	export let targetDate: string;
	export let isSelected: boolean;

	$: isLong = Math.abs(getDurationInMinutes(event)) > GRID_CELL_TIME;

	const dispatch = createEventDispatcher<{
		toggleEvent: { event: AnyEvent; targetDate: string };
	}>();

	$: title =
		!isLong && event.subTasks?.length
			? `${event.name} + ${event.subTasks.length}`
			: `${event.name}`;
</script>

<div
	class={clsx(
		'group absolute inset-px flex select-none flex-col overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5',
		{
			'border-1 touch-none border border-black': isSelected,
		},
		tailwindColors[event.category.color].text,
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
	)}
>
	<p class="truncate pr-3 font-semibold">
		<span>{title}</span>
	</p>

	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions-->
	<label
		class={clsx('absolute right-0 top-0 flex p-[5px] pl-3', { 'pb-3': isLong })}
		on:click|stopPropagation
	>
		<input
			checked={event.isDone}
			class="rounded border-gray-300 focus:ring-indigo-600"
			on:change={() => dispatch('toggleEvent', { event, targetDate })}
			type="checkbox"
		/>
	</label>

	{#if isLong}
		<time
			class={tailwindColors[event.category.color].lightText}
			dateTime={`${event.date}T${event.startTime}`}
		>
			{format(parse(event.startTime, TIME, new Date()), 'p')}
		</time>
		<div class="test text-pink-500 group-hover:text-pink-700">
			{#if event.subTasks?.length}
				<ul class="test">
					{#each event.subTasks as subTask (subTask.id)}
						<li class={clsx('flex items-center gap-1', { 'line-through': subTask.isDone })}>
							<span>{subTask.name}</span>
						</li>
					{/each}
				</ul>
			{:else}
				{event.description}
			{/if}
		</div>
	{/if}
</div>

<style>
	.group {
		scrollbar-width: none;
	}
</style>
