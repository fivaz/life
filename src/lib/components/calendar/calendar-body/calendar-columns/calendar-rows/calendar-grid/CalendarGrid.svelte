<script lang="ts">
	import { clsx } from 'clsx';

	import GridCell from './grid-cell/GridCell.svelte';
	import { NUMBER_OF_CELLS } from './service';

	interface Props {
		targetDate: string;
		create: (time: string) => void;
	}

	let { targetDate, create }: Props = $props();
</script>

<div class="h-full">
	{#each Array.from({ length: NUMBER_OF_CELLS }, (_, i) => i) as cellNumber (cellNumber)}
		<GridCell {cellNumber} class={clsx('h-1/2')} {create} {targetDate} />
	{/each}
</div>
