<script lang="ts">
	import { TIME } from '$lib/consts.js';
	import { type AnyEvent } from '$lib/task/utils.js';
	import { format, parse } from 'date-fns';

	import { isShort, toggleCompletion } from '../service.js';

	export let event: AnyEvent;

	export let userId: string;

	export let targetDate: string;
</script>

<div class="relative font-semibold overflow-hidden">
	{#if isShort(event)}
		<div class="flex gap-3 justify-between items-center">
			<div class="overflow-hidden">
				<p class="truncate">
					{event.name}
				</p>
			</div>

			<input
				checked={event.isDone}
				class="rounded border-gray-300 focus:ring-indigo-600"
				on:change={() => toggleCompletion(userId, event, targetDate)}
				on:mouseup|stopPropagation
				type="checkbox"
			/>
		</div>
	{:else}
		<div>
			<div class="flex gap-3 justify-between items-center">
				<p class="text-blue-500 group-hover:text-blue-700">
					<time dateTime={`${event.date} ${event.startTime}`}>
						{format(parse(event.startTime, TIME, new Date()), 'p')}
					</time>
				</p>

				<input
					checked={event.isDone}
					class="rounded border-gray-300 focus:ring-indigo-600"
					on:change={() => toggleCompletion(userId, event, targetDate)}
					on:mouseup|stopPropagation
					type="checkbox"
				/>
			</div>

			<p>{event.name}</p>

			<div class="text-pink-500 group-hover:text-pink-700">
				{event.description}
			</div>
		</div>
	{/if}
</div>
