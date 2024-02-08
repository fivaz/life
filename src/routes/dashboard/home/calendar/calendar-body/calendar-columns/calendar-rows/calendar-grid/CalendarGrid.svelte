<script lang="ts">
	import { draggedEvent } from '$lib/dragged/store';
	import classnames from 'classnames';

	import { halfHourInterval } from '../service';
	import GridCell from './grid-cell/GridCell.svelte';

	export let targetDate: string;
</script>

<div
	class="h-full grid divide-y"
	style="grid-template-rows: repeat({halfHourInterval}, minmax(3.5rem, 1fr))"
>
	{#each Array.from({ length: halfHourInterval }, (_, i) => i * 2) as quarterHour (quarterHour)}
		<div>
			<GridCell
				class={classnames('h-1/2', { 'border-b': $draggedEvent })}
				on:create
				on:move
				{quarterHour}
				{targetDate}
			/>
			<GridCell class="h-1/2" on:create on:move quarterHour={quarterHour + 1} {targetDate} />
		</div>
	{/each}
</div>
