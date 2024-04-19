<script lang="ts">
	import classnames from 'classnames';

	import { halfHourInterval } from '../service';
	import GridCell from './grid-cell/GridCell.svelte';
	import { GRID_CELL_HEIGHT, isSomethingDragging } from './service';

	export let targetDate: string;
</script>

<div
	class="grid h-full divide-y"
	style="grid-template-rows: repeat({halfHourInterval}, minmax({GRID_CELL_HEIGHT * 2}px, 1fr))"
>
	{#each Array.from({ length: halfHourInterval }, (_, i) => i * 2) as quarterHour (quarterHour)}
		<div>
			<GridCell
				class={classnames('h-1/2', { 'border-b': $isSomethingDragging })}
				on:create
				{quarterHour}
				{targetDate}
			/>
			<GridCell class="h-1/2" on:create quarterHour={quarterHour + 1} {targetDate} />
		</div>
	{/each}
</div>
