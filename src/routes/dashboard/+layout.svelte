<script lang="ts">
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modal } from '$lib/components/dialog/service';
	</script>

<Dashboard user={$page.data.session?.user}>
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
