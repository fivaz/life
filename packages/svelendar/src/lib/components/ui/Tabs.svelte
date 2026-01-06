<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Props {
		options?: string[]; // values
		labels?: string[]; // display labels
		initial?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let {
		options = ['plan', 'currently'],
		labels = [],
		initial = options[0],
		size = 'md',
	}: Props = $props();

	const dispatch = createEventDispatcher();
	let selected = $state<string>(initial);

	function select(val: string) {
		selected = val;
		dispatch('change', val);
	}
</script>

<div class="flex w-full justify-center">
	<div class="inline-flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800">
		{#each options as opt, i (opt + i)}
			<button
				class="rounded-md px-3 py-1 text-sm font-medium transition"
				class:selected={selected === opt}
				onclick={() => select(opt)}
			>
				{labels[i] ?? opt.charAt(0).toUpperCase() + opt.slice(1)}
			</button>
		{/each}
	</div>
</div>

<style>
	button[selected] {
		/* not used; styling via class:selected */
	}
	button[class*='selected'] {
		/* fallback */
	}
	/* Use Tailwind classes inline; keep minimal CSS here */
</style>
