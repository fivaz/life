<script lang="ts">
	import { onMount } from 'svelte';

	import Evening from '../evening/Evening.svelte';
	import Morning from '../morning/Morning.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();

	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	// Create tweened values for the y-positions
	const redY = tweened(0, { duration: 1000, easing: cubicOut });
	const blueY = tweened(0, { duration: 1000, easing: cubicOut });

	let direction = $state(1);

	function animate() {
		// Toggle positions
		if (direction === 1) {
			redY.set(80); // Red slides down
			blueY.set(0); // Blue slides up
		} else {
			redY.set(0); // Red slides up
			blueY.set(80); // Blue slides down
		}

		// Toggle direction for the next cycle
		direction *= -1;
	}

	onMount(() => {
		// Loop the animation every second
		const interval = setInterval(animate, 2000);
		return () => clearInterval(interval); // Cleanup interval on unmount
	});
</script>

<div class="relative overflow-hidden {klass}">
	<div class="absolute {klass}" style="transform: translateY({$redY}px);">
		<Morning class={klass} />
	</div>

	<div class="absolute {klass}" style="transform: translateY({$blueY}px);">
		<Evening class={klass} />
	</div>
</div>
