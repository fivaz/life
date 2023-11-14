<script lang="ts">
	import { halfHourInterval } from '../service';
	import GridCell from './grid-cell/GridCell.svelte';
</script>

<div
	class="h-full grid divide-y"
	style="grid-template-rows: repeat({halfHourInterval}, minmax(3.5rem, 1fr))"
>
	{#each Array.from({ length: halfHourInterval }, (_, i) => i) as halfHour (halfHour)}
		<GridCell on:create on:move {halfHour} />
	{/each}
</div>
