<script lang="ts">
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let label: string = '';

	export let inputClass: string = '';

	export let labelClass: string = '';

	export let value: null | string | undefined = undefined;

	const dispatch = createEventDispatcher<{ input: string }>();
</script>

<label
	class={classnames(
		$$props.class,
		'block text-sm font-medium',
		$$props.disabled ? 'text-gray-500' : 'text-gray-700',
	)}
>
	{#if label}
		<span class={classnames(labelClass)}>
			{label}
		</span>
	{/if}
	<input
		{...$$props}
		bind:value
		class={classnames(
			inputClass,
			{ 'cursor-not-allowed': $$props.disabled },
			'block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
		)}
		on:input={(e) => dispatch('input', e.currentTarget.value)}
	/>
	<!--on:input needs to dispatch itself in order to its type be correctly typed, otherwise we can use
	e.currentTarget outside a native inputElement and we can't cast a type inside a Svelte template-->
</label>
