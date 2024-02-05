<script lang="ts">
	import type { AnyEvent, Event } from '$lib/task/utils';

	import { tailwindColors } from '$lib/category/utils';
	import Loading from '$lib/components/loading/Loading.svelte';
	import { TIME } from '$lib/consts';
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

<SignedIn let:user>
	<div
		class={classnames(
			{ 'py-2': !isShort(event) },
			'cursor-move group w-full h-full flex flex-col rounded-lg py-1 px-2 text-xs leading-5',
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
			tailwindColors[event.category.color].text,
		)}
		draggable="true"
		on:click={() => dispatch('edit', { event, targetDate })}
		on:dragend={(e) => dragEnd(e)}
		on:dragstart={(e) => dragStart(e, event)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				dispatch('edit', { event, targetDate });
			}
		}}
		role="button"
		tabindex="0"
	>
		<div class="absolute right-0 pr-2">
			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				disabled={loading}
				on:change={() => toggleCompletion(user.uid, event, targetDate)}
				on:click|stopPropagation
				type="checkbox"
			/>
		</div>
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
</SignedIn>

<Loading class={classnames('h-4 w-4', tailwindColors[event.category.color].text)} {loading} />
