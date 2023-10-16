<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TEvent } from '$lib';
	import {
		isShort,
		toggleDone
	} from '$lib/components/calendar/calendar-body/calendar-columns/calendar-rows/service';
	import classnames from 'classnames';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	export let event: TEvent;

	let form: HTMLFormElement;

	const dispatch = createEventDispatcher();
</script>

<div
	class={classnames(
		{ 'py-2': !isShort(event) },
		'group absolute w-full h-full flex flex-col overflow-y-auto rounded-lg bg-blue-50 py-1 px-2 text-xs leading-5 hover:bg-blue-100'
	)}
>
	<div class="absolute right-0 pr-2">
		<form method="POST" action="?/toggle" use:enhance bind:this={form}>
			<input type="hidden" name="id" value={event.id} />
			<label>
				<input
					type="checkbox"
					checked={event.isDone}
					on:change={(e) => toggleDone(event, e.currentTarget.checked, form)}
					name="isDone"
					class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
				/>
			</label>
		</form>
	</div>
	<div
		on:click={() => dispatch('edit', event)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				dispatch('edit', event);
			}
		}}
		tabindex="0"
		role="button"
		class="w-full h-full"
	>
		<p class={classnames({ hidden: isShort(event) }, 'text-blue-500 group-hover:text-blue-700')}>
			<time dateTime="2022-01-22T06:00">{format(event.startDate, 'p')}</time>
		</p>
		<p class="font-semibold text-blue-700">{event.name}</p>
		<p
			class={classnames(
				{ hidden: isShort(event) || !event.description },
				'text-pink-500 group-hover:text-pink-700'
			)}
		>
			{event.description}
		</p>
	</div>
</div>
