<script lang="ts">
	import { page } from '$app/stores';
	import Login from '$lib/components/login/Login.svelte';
</script>

<Login session={$page.data.session} />
