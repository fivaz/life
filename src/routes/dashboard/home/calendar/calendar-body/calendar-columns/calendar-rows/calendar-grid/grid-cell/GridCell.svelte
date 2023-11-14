<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ create: number; move: number }>();

	export let halfHour: number;

	function dragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	}

	function drop(event: DragEvent) {
		event.preventDefault();
		dispatch('move', halfHour);
	}
</script>

<div
	on:dragover={dragOver}
	on:drop={drop}
	on:click={() => dispatch('create', halfHour)}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			dispatch('create', halfHour);
		}
	}}
	tabindex="0"
	role="button"
/>
