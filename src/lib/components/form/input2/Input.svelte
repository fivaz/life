<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label?: string;
		inputClass?: string;
		labelClass?: string;
		value?: string;
		disabled?: boolean;
	}

	let { label, inputClass, labelClass, value = $bindable(), disabled, ...rest }: Props = $props();
</script>

<label class="block text-sm font-medium {disabled ? 'text-gray-500' : 'text-gray-700'}">
	{#if label}
		<span class={labelClass}>{label}</span>
	{/if}
	<input
		{...rest}
		class:cursor-not-allowed={disabled}
		class="{inputClass} block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		bind:value
	/>
	<!--on:input needs to dispatch itself in order to its type be correctly typed, otherwise we can use
	e.currentTarget outside a native inputElement and we can't cast a type inside a Svelte template-->
</label>
