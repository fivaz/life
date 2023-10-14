<script lang="ts">
	import type { TEvent } from '$lib';

	export let events: TEvent[];
</script>

<div class="grid grid-cols-1 grid-rows-24 border-t">
	{#each Array.from({ length: 24 }, (_, i) => i) as hour (hour)}
		<div class="h-[3.5rem] text-right text-xs leading-5 text-gray-400 border-b">
			<!--			-->
		</div>
	{/each}
</div>
