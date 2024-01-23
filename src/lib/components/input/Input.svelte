<script lang="ts">
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let label: string = '';

	export let inputClass: string = '';

	export let labelClass: string = '';

	export let value = '';

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
		class={classnames(
			inputClass,
			{ 'cursor-not-allowed': $$props.disabled },
			'p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
		)}
		bind:value
		on:input={(e) => dispatch('input', e.currentTarget.value)}
	/>
	<!--on:input needs to dispatch itself in order to its type be correctly typed, otherwise we can use
	e.currentTarget outside a native inputElement and we can't cast a type inside a Svelte template-->
</label>
