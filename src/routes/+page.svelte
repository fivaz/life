<script lang="ts">
	import { goto } from '$app/navigation';
	import { homeRoute } from '$lib/consts';
	import { onMount } from 'svelte';

	onMount(() => goto(homeRoute));
</script>
