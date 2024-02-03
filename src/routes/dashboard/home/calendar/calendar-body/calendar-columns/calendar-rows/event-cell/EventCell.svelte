<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { TIME } from '$lib/consts';
	import type { AnyEvent, Event } from '$lib/task/utils';
	import classnames from 'classnames';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { SignedIn } from 'sveltefire';
	import EventName from './event-name/EventName.svelte';
	import { dragEnd, dragStart, isShort, toggleCompletion } from './service';

	export let event: AnyEvent;

	// the date this event is taking place, in case of a recurring Event
	// this might not be the same day as the event.startDate
	export let targetDate: Date;

	let loading = false;

	const dispatch = createEventDispatcher<{ edit: { event: Event; targetDate: Date } }>();
</script>

<div
	on:dragstart={(e) => dragStart(e, event)}
	on:dragend={(e) => dragEnd(e)}
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
	<SignedIn let:user>
		<input
			type="checkbox"
			checked={event.isDone}
			on:change={() => toggleCompletion(user.uid, event, targetDate)}
			on:click|stopPropagation
			disabled={loading}
			class="rounded border-gray-300 focus:ring-indigo-600"
		/>
	</SignedIn>
	<p class={classnames({ hidden: isShort(event) }, 'text-blue-500 group-hover:text-blue-700')}>
		<time dateTime={`${event.date} ${event.startTime}`}>
			{format(parse(event.startTime, TIME, new Date()), 'p')}
		</time>
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
