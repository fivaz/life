<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import { GRID_CELL_TIME } from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/calendar-grid/service';
	import { TIME } from '$lib/consts';
	import { type AnyEvent, getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import DOMPurify from 'dompurify';
	import { createEventDispatcher } from 'svelte';

	export let event: AnyEvent;
	export let targetDate: string;
	export let isSelected: boolean;

	const dispatch = createEventDispatcher<{
		toggleEvent: { event: AnyEvent; targetDate: string };
	}>();

	function isLong() {
		return Math.abs(getDurationInMinutes(event)) > GRID_CELL_TIME;
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

	function getContent() {
		if (event.subTasks?.length) {
			return event.subTasks
				.map(
					(task) =>
						`<span class="${task.isDone ? 'line-through' : ''}">- ${DOMPurify.sanitize(task.name)}</span>`,
				)
				.join('<br>');
		} else {
			return event.description;
		}
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
		tailwindColors[event.category.color].hoverBg,
	)}
>
	<p class="truncate pr-3 font-semibold">
		{getTitle()}
	</p>

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
			<time
				class={tailwindColors[event.category.color].lightText}
				dateTime={`${event.date}T${event.startTime}`}
			>
				{format(parse(event.startTime, TIME, new Date()), 'p')}
			</time>
			<div class="test text-pink-500 group-hover:text-pink-700">
				<!-- eslint-disable-next-line svelte/no-at-html-tags-->
				{@html getContent()}
			</div>
		</div>
	{/if}
</div>

<style>
	.group {
		scrollbar-width: none;
	}
</style>
