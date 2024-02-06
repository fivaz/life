<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { dashboardRoute, loginRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { userStore } from 'sveltefire';

	let user = userStore(auth);

	$: {
		if (browser && !$user?.uid && $page.url.pathname.startsWith(dashboardRoute)) {
			goto(loginRoute);
		}
	}
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
