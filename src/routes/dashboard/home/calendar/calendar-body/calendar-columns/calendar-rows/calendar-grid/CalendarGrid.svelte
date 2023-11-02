<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { halfHourInterval } from '../service';

	const dispatch = createEventDispatcher<{ create: number }>();
</script>

<div
	class="h-full grid divide-y"
	style="grid-template-rows: repeat({halfHourInterval}, minmax(3.5rem, 1fr))"
>
	{#each Array.from({ length: halfHourInterval }, (_, i) => i) as halfHour (halfHour)}
		<div
			on:click={() => dispatch('create', halfHour)}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					dispatch('create', halfHour);
				}
			}}
			tabindex="0"
			role="button"
		/>
	{/each}
</div>
