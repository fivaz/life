<script lang="ts">
	import { Plus } from 'lucide-svelte';
</script>

<!--to prevent the floating button from hiding any element-->
<div class="h-8" />

<button
	class="fixed bottom-4 right-8 flex items-center gap-2 rounded-full bg-indigo-600 p-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
	on:click
	type="button"
>
	<Plus class="h-4 w-4" />
</button>
