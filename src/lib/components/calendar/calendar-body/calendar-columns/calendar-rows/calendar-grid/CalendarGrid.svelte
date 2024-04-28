<script lang="ts">
	import { clsx } from 'clsx';

	import GridCell from './grid-cell/GridCell.svelte';
	import { NUMBER_OF_CELLS } from './service';

	export let targetDate: string;
</script>

<div class="h-full">
	{#each Array.from({ length: NUMBER_OF_CELLS }, (_, i) => i) as cellNumber (cellNumber)}
		<GridCell {cellNumber} class={clsx('h-1/2')} on:click {targetDate} />
	{/each}
</div>
