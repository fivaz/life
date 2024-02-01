<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { DATE } from '$lib/consts';
	import { removeDraggedEvent, setDraggedEvent } from '$lib/dragged/store';
	import type { Event, RecurringEvent } from '$lib/task/utils';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import EventName from './event-name/EventName.svelte';
	import { isShort } from './service';

	export let event: Event | RecurringEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: Date;

	let loading = false;

	let formElement: HTMLFormElement | null = null;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: Date } }>();

	function dragStart(e: DragEvent) {
		if (e.currentTarget instanceof HTMLDivElement) {
			e.currentTarget.style.opacity = '0.5';
			setDraggedEvent(event);
		}
	}

	function dragEnd(e: DragEvent) {
		if (e.currentTarget instanceof HTMLDivElement) {
			e.currentTarget.style.opacity = '';
			removeDraggedEvent();
		}
	}
</script>

<div
	on:dragstart={dragStart}
	on:dragend={dragEnd}
	on:click={() => dispatch('edit', { event, targetDate })}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('edit', { event, targetDate });
		}
	}}
	tabindex="0"
	role="button"
	draggable="true"
	class={classnames(
		{ 'py-2': !isShort(event) },
		'cursor-move group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
		tailwindColors[event.category.color].lightBg,
		tailwindColors[event.category.color].hoverBg,
		tailwindColors[event.category.color].text,
	)}
>
	<form class="absolute right-0 flex pr-2" method="POST" action="?/toggle" bind:this={formElement}>
		<input type="hidden" name="id" value={event.id} />
		<input type="hidden" name="targetDate" value={targetDate.toISOString()} />
		<input
			type="checkbox"
			checked={event.isDone}
			on:change={() => formElement?.requestSubmit()}
			on:click|stopPropagation
			name="isDone"
			disabled={loading}
			class="rounded border-gray-300 focus:ring-indigo-600"
		/>
	</form>

	<p class={classnames({ hidden: isShort(event) }, 'text-blue-500 group-hover:text-blue-700')}>
		<time dateTime={event.date}>{format(parse(event.date, DATE, new Date()), 'p')}</time>
	</p>

	<EventName {event} />

	<p
		class={classnames(
			{ hidden: isShort(event) || !event.description },
			'text-pink-500 group-hover:text-pink-700',
		)}
	>
		{event.description}
	</p>
</div>

<Loading {loading} class={classnames('h-4 w-4', tailwindColors[event.category.color].text)} />
