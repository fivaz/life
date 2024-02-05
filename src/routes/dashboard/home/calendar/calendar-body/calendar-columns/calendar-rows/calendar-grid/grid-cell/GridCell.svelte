<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	let className = '';
	export { className as class };
	export let quarterHour: number;

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
</script>

<div
	class={className}
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
