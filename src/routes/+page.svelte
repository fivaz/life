<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/consts';
	import { onMount } from 'svelte';

	onMount(() => goto(Routes.HOME));
</script>
