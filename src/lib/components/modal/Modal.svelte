<script lang="ts">
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let show: boolean;

	const dispatch = createEventDispatcher();
</script>

<div class={classnames({ hidden: !show })}>
	<div
		class="fixed inset-0 flex items-center justify-center z-50"
		transition:fade={{ duration: 900 }}
	>
		<div class="absolute inset-0 bg-black opacity-50" on:click={() => dispatch('close')} />

		<div class="relative">
			<slot />
		</div>
	</div>
</div>
