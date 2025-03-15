<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'oninput'> {
		label?: string;
		inputClass?: string;
		labelClass?: string;
		disabled?: boolean;
		oninput?: (input: string) => void;
		autofocus?: boolean;
	}

	let {
		label,
		inputClass,
		labelClass,
		value = $bindable(),
		disabled,
		oninput,
		class: klass,
		autofocus = false,
		...rest
	}: Props = $props();

	function focus(node: HTMLElement) {
		if (autofocus) {
			requestAnimationFrame(() => {
				if (node.offsetParent !== null) {
					node.focus();
				}
			});
		}
	}
</script>

<label
	class="{klass} block text-sm font-medium {disabled
		? 'text-gray-500'
		: 'text-gray-700 dark:text-white'}"
>
	{#if label}
		<span class={labelClass}>{label}</span>
	{/if}
	<input
		class="{inputClass} block rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:[color-scheme:dark]"
		class:cursor-not-allowed={disabled}
		bind:value
		use:focus
		{...rest}
		oninput={(e) => oninput?.(e.currentTarget.value)}
	/>
	<!--on:input needs to dispatch itself in order to its type be correctly typed, otherwise we can use
	e.currentTarget outside a native inputElement and we can't cast a type inside a Svelte template-->
</label>
