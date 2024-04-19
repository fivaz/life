<script lang="ts">
	const interval = 24 * 2;
</script>

<div class="h-full">
	{#each Array.from({ length: interval }, (_, i) => i) as quarterHour (quarterHour)}
		<div class="h-7"></div>
		<div class="h-7 border-b"></div>
	{/each}
</div>
