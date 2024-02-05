<script lang="ts">
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';

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
	cancelText={$modal.cancelText}
	confirmText={$modal.confirmText}
	message={$modal.message}
	resolve={$modal.resolve}
	show={$modal.show}
	title={$modal.title}
/>
