<script lang="ts">
	import type { TTask } from '$lib/task/utils';

	export let toDos: TTask[];
</script>

{#if toDos.length}
	<div class="">{toDos.length} pending tasks</div>
{/if}
