<script lang="ts">
	import { tailwindColors } from '$lib/category/utils';
	import { TIME } from '$lib/consts';
	import { type AnyEvent, getDurationInMinutes } from '$lib/task/utils';
	import { clsx } from 'clsx';
	import { format, parse } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let event: AnyEvent;

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ toggle: AnyEvent }>();

	export function isLong(event: AnyEvent) {
		return Math.abs(getDurationInMinutes(event)) > 15;
	}
</script>

<div class={clsx('flex', className)}>
	<div
		class={clsx(
			'group absolute inset-px flex flex-col overflow-y-auto rounded-lg px-2 py-1 text-xs leading-5',
			tailwindColors[event.category.color].text,
			tailwindColors[event.category.color].lightBg,
			tailwindColors[event.category.color].hoverBg,
		)}
	>
		<div class="flex gap-3 justify-between items-center">
			<p class="font-semibold truncate">
				{event.name}
			</p>
			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				on:change={() => dispatch('toggle', event)}
				type="checkbox"
			/>
		</div>
		{#if isLong(event)}
			<time
				class={tailwindColors[event.category.color].lightText}
				dateTime={`${event.date}T${event.startTime}`}
			>
				{format(parse(event.startTime, TIME, new Date()), 'p')}
			</time>
			<p class="text-pink-500 group-hover:text-pink-700">
				{event.description}
			</p>
		{/if}
	</div>
</div>
