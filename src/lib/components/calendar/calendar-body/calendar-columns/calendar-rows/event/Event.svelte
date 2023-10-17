<script lang="ts">
	import { Loader2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { TEvent } from '$lib';
	import { toggleEvent } from '$lib/store/events';
	import classnames from 'classnames';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { isShort } from './service';

	export let event: TEvent;

	let form: HTMLFormElement;

	let loading: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: TEvent;
	}>();

	const submit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				toggleEvent(event);
			}
			loading = false;
		};
	};
</script>

<div
	on:click={() => dispatch('edit', event)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('edit', event);
		}
	}}
	tabindex="0"
	role="button"
	class={classnames(
		{ 'py-2': !isShort(event) },
		'group w-full h-full flex flex-col overflow-y-auto rounded-lg bg-blue-50 py-1 px-2 text-xs leading-5 hover:bg-blue-100'
	)}
>
	<div class="absolute right-0 pr-2">
		<form method="POST" action="?/toggle" bind:this={form} use:enhance={submit}>
			<input type="hidden" name="id" value={event.id} />
			<label>
				<input
					type="checkbox"
					checked={event.isDone}
					on:change={() => form.requestSubmit()}
					on:click|stopPropagation
					name="isDone"
					class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
				/>
			</label>
		</form>
	</div>
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

{#if loading}
	<div
		class="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
	>
		<Icon src={Loader2} class="animate-spin" />
	</div>
{/if}
