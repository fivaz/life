<script lang="ts">
	import { halfHourInterval } from '../service';
	import GridCell from './grid-cell/GridCell.svelte';
</script>

<div
	class="h-full grid divide-y"
	style="grid-template-rows: repeat({halfHourInterval}, minmax(3.5rem, 1fr))"
>
	{#each Array.from({ length: halfHourInterval }, (_, i) => i * 2) as quarterHour (quarterHour)}
		<div>
			<GridCell class="h-1/2" on:create on:move {quarterHour} />
			<GridCell class="h-1/2" on:create on:move quarterHour={quarterHour + 1} />
		</div>
	{/each}
</div>
