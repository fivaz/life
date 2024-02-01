<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { sessionStore } from '$lib/auth/store';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	import { loginRoute } from '$lib/consts';
	import { SignedIn } from 'sveltefire';

	// $: {
	// 	if (!$session.uid && $page.url.pathname.startsWith('/dashboard')) {
	// 		// browser && goto(loginRoute);
	// 	}
	// }
</script>

<Dashboard>
	<slot />
</Dashboard>

<Dialog
	show={$modal.show}
	title={$modal.title}
	message={$modal.message}
	confirmText={$modal.confirmText}
	cancelText={$modal.cancelText}
	resolve={$modal.resolve}
/>
