<script lang="ts">
	import { IconRender } from '@life/shared';
	import { tailwindColorMap } from '@life/shared/category';
	import { floorRound15, TIME } from '@life/shared/date';
	import type { Task } from '@life/shared/task';
	import { getCheckList, getDurationInMinutes, getTaskTitle } from '@life/shared/task';
	import clsx from 'clsx';
	import { format, parse } from 'date-fns';
	import DOMPurify from 'dompurify';

	import { getToggleCompletion } from '$lib/context.utils.js';

	import { GRID_CELL_TIME } from '../../calendar-grid/service.svelte.js';

	interface Props {
		event: Task;
		tasks: Task[];
		targetDate: string;
		isSelected: boolean;
	}

	let { event, targetDate, isSelected, tasks }: Props = $props();

	// format date from this format '01:15' to this format '1h15min'
	function formattedDuration() {
		const date = floorRound15(parse(event.duration, TIME, new Date()));

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

	function disableCheckboxes(htmlString: string) {
		// Replace <input type="checkbox"> with <input type="checkbox" disabled>
		return htmlString.replace(
			/<input type="checkbox"(.*?)>/gi,
			'<input type="checkbox"$1 disabled>',
		);
	}

	function getDescription(event: Task) {
		return event.description;
		// if (!DOMPurify) return '';
		// const sanitizedHtml = DOMPurify.sanitize(event.description, {
		// 	ALLOWED_TAGS: ['div', 'p', 'ul', 'li', 'label', 'input', 'span', 'strong', 'em'],
		// 	ALLOWED_ATTR: ['class', 'data-type', 'data-checked', 'type', 'checked', 'disabled'],
		// });
		//
		// return disableCheckboxes(sanitizedHtml);
	}

	const toggleEvent = getToggleCompletion();
</script>

<div
	class="group absolute inset-px overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5 select-none
		{isSelected ? 'touch-none' : ''}
		{tailwindColorMap[event.category.color].text}
		{tailwindColorMap[event.category.color].lightBg}
		{tailwindColorMap[event.category.color].hoverLightBg}
	"
>
	<div class="flex items-center gap-1">
		{#if event.goal?.icon}
			<IconRender name={event.goal.icon} class="size-4 shrink-0" />
		{/if}
		<div class="flex truncate pr-4 font-semibold">
			<span class="truncate">{getTaskTitle(event)}</span>
			<span class={clsx({ 'pl-1': !!getCheckList(event, tasks) })}>
				{getCheckList(event, tasks)}
			</span>
		</div>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<label
		class="absolute top-0 right-0 flex p-[5px] pl-3"
		class:pb-3={isLong()}
		onclick={(e) => e.stopPropagation()}
	>
		<input
			class="rounded-xs border-gray-300 focus:ring-indigo-600"
			checked={event.isDone}
			onchange={() => toggleEvent(event, targetDate)}
			type="checkbox"
		/>
	</label>

	<div class="overflow-hidden">
		<div>
			<time
				class="{tailwindColorMap[event.category.color].lightText}
								{tailwindColorMap[event.category.color].hoverText}"
				dateTime={`${event.date}T${event.startTime}`}
			>
				{format(parse(event.startTime, TIME, new Date()), 'p')}
			</time>
			<span> ({formattedDuration()})</span>
		</div>
		<div class="ProseMirror text-pink-500 group-hover:text-pink-700">
			<!-- eslint-disable-next-line svelte/no-at-html-tags !-->
			{@html getDescription(event)}
		</div>
	</div>
</div>

<style>
	.group {
		scrollbar-width: none;
	}
</style>
