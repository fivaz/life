<script lang="ts">
	import type { EEvent } from '$lib/event/utils';
	import classnames from 'classnames';
	import { onMount } from 'svelte';
	import { isShort } from '../service';

	let eventContainer: HTMLDivElement | null = null;

	let nameContainer: HTMLParagraphElement | null = null;

	export let event: EEvent;

	onMount(() => {
		if (eventContainer && nameContainer) {
			const words = event.name.split(' ');
			while (eventContainer.scrollHeight > eventContainer.clientHeight) {
				words.pop();
				nameContainer.innerText = words.join(' ') + ' ...';
			}
		}
	});
</script>

<!--20px is the width of the form of the checkbox-->
<div bind:this={eventContainer} class="overflow-hidden">
	<p
		bind:this={nameContainer}
		class={classnames('font-semibold ', {
			'truncate w-[calc(100%-20px)]': isShort(event),
		})}
	>
		{event.name}
	</p>
</div>
