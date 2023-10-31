<script lang="ts">
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ input: string }>();
	export let label: string;
	export let labelClass: string = '';

	export let value = '';
</script>

<label class={classnames(labelClass, 'block text-sm font-medium text-gray-700 mb-1')}>
	{label}
	<input
		{...$$props}
		class={classnames(
			$$props.class,
			'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
		)}
		bind:value
		on:input={(e) => dispatch('input', e.currentTarget.value)}
	/>
	<!--	TODO check if even could only be this on:input without dispatch-->
</label>
