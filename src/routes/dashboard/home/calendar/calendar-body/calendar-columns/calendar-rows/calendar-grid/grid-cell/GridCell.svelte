<script lang="ts">
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let quarterHour: number;
	export let targetDate: string;

	function getTime(quarterHour: number) {
		const totalMinutes = quarterHour * 15;

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
</script>

<!--the class grid-cell is used in EventPanel to control droppable zones for its drag and drop-->
<div
	class={classnames('grid-cell', className)}
	data-date={targetDate}
	data-time={getTime(quarterHour)}
	on:click={() => dispatch('create', quarterHour)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', quarterHour);
		}
	}}
	role="button"
	tabindex="0"
/>
