<script lang="ts">
	import { clsx } from 'clsx';

	import NewGridCell from './new-grid-cell/NewGridCell.svelte';
	import { NUMBER_OF_CELLS } from './service';

	export let targetDate: string;
</script>

<div class="h-full">
	{#each Array.from({ length: NUMBER_OF_CELLS }, (_, i) => i) as cellNumber (cellNumber)}
		<NewGridCell {cellNumber} class={clsx('h-1/2')} on:create {targetDate} />
	{/each}
</div>
