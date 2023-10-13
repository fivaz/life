<script lang="ts">
</script>

<div class="flex flex-col border-t">
	{#each Array.from({ length: 24 }, (_, i) => i) as hour (hour)}
		<div class="h-[3.5rem] text-right text-xs leading-5 text-gray-400 border-b">
			{hour}
		</div>
	{/each}
</div>
