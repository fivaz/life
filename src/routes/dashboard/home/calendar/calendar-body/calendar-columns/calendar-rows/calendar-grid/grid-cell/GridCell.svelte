<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let quarterHour: number;

	function dragOver(event: DragEvent) {
		event.preventDefault();
		console.log('dragOver - quarterHour', quarterHour);
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}

	function drop(event: DragEvent) {
		event.preventDefault();
		console.log('drop - quarterHour', quarterHour);
		dispatch('move', quarterHour);
	}
</script>

<div
	class={className}
	on:dragover={dragOver}
	on:drop={drop}
	on:click={() => dispatch('create', quarterHour)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', quarterHour);
		}
	}}
	tabindex="0"
	role="button"
/>
