<script>
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
</script>

<Dashboard session={$page.data.session}>
	<slot />
</Dashboard>
