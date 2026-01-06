<script lang="ts">
	import GridCell from './grid-cell/GridCell.svelte';
	import { NUMBER_OF_CELLS } from './service.svelte.js';

	interface Props {
		targetDate: string;
		create: (time: string) => void;
	}

	let { targetDate, create }: Props = $props();
</script>

<div class="h-full">
	{#each Array.from({ length: NUMBER_OF_CELLS }, (_, i) => i) as cellNumber (cellNumber)}
		<GridCell {cellNumber} {create} {targetDate} />
	{/each}
</div>
