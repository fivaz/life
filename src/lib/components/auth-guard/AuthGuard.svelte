<script lang="ts">
	import { currentUser } from '$lib/auth/utils';
	import type { Snippet } from 'svelte';
	
interface Props {
		data: Snippet<[{ uid: string }]>;
	}

	let { data }: Props = $props();
</script>

{#if $currentUser}
	{@render data($currentUser)}
{/if}
