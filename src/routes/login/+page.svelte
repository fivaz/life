<script lang="ts">
	import { page } from '$app/stores';
	import Login from './login/Login.svelte';
</script>

<Login error={$page.url.searchParams.get('error')} user={$page.data.session?.user} />
