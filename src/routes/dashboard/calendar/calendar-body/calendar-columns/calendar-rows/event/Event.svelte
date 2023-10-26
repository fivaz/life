<script lang="ts">
	import { Loader2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { tailwindClasses } from '$lib/category/utils';
	import { toggleEvent } from '$lib/event/store';
	import type { EEvent } from '$lib/event/utils';
	import classnames from 'classnames';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { isShort } from './service';

	export let event: EEvent;

	let form: HTMLFormElement;

	let loading: boolean = false;

	const dispatch = createEventDispatcher<{ edit: EEvent }>();

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
		'group w-full h-full flex flex-col overflow-y-auto rounded-lg py-1 px-2 text-xs leading-5',
		tailwindClasses[event.category.color],
	)}
>
	<form
		class="absolute right-0 flex pr-2"
		method="POST"
		action="?/toggle"
		bind:this={form}
		use:enhance={submit}
	>
		<input type="hidden" name="id" value={event.id} />
		<input
			type="checkbox"
			checked={event.isDone}
			on:change={() => form.requestSubmit()}
			on:click|stopPropagation
			name="isDone"
			class="rounded border-gray-300 focus:ring-indigo-600"
		/>
	</form>
	<p class={classnames({ hidden: isShort(event) }, 'text-blue-500 group-hover:text-blue-700')}>
		<time dateTime={event.startDate.toISOString()}>{format(event.startDate, 'p')}</time>
	</p>
	<!--20px is the width of the form of the checkbox-->
	<p
		class={classnames('font-semibold ', {
			'truncate w-[calc(100%-20px)]': isShort(event),
		})}
	>
		{event.name}
	</p>
	<p
		class={classnames(
			{ hidden: isShort(event) || !event.description },
			'text-pink-500 group-hover:text-pink-700',
		)}
	>
		{event.description}
	</p>
</div>

{#if loading}
	<div
		class="absolute flex justify-center items-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
	>
		<Icon src={Loader2} class="animate-spin h-4 w-4" />
	</div>
{/if}
