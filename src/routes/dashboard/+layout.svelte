<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { dashboardRoute, loginRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user && $page.url.pathname.startsWith(dashboardRoute)) {
				goto(loginRoute);
			}
		});
	});
</script>

<Dashboard>
	<slot />
</Dashboard>

<Dialog
	cancelText={$modal.cancelText}
	confirmText={$modal.confirmText}
	message={$modal.message}
	resolve={$modal.resolve}
	show={$modal.show}
	title={$modal.title}
/>
