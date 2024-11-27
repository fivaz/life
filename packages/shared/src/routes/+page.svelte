<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import { add } from '$lib';
</script>

<Button>test</Button>
{add(1, 3)}
