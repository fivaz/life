<script lang="ts">
	import { DATE } from '$lib/consts';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let quarterHour: number;
	export let targetDate: string;

	function dragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}

	function drop(event: DragEvent) {
		event.preventDefault();
		dispatch('move', quarterHour);
	}

	function getTime(quarterHour: number) {
		const totalMinutes = quarterHour * 15;

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
</script>

<div
	class={className}
	data-date={format(targetDate, DATE)}
	data-time={getTime(quarterHour)}
	on:click={() => dispatch('create', quarterHour)}
	on:dragover={dragOver}
	on:drop={drop}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', quarterHour);
		}
	}}
	role="button"
	tabindex="0"
/>
