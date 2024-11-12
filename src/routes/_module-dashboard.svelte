<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	import { setUser } from '$lib/auth/utils.svelte.js';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte.js';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			if (!user) {
				history.pushState({}, '', Routes.LOGIN);
			}
		});
	});
</script>

<Dashboard>
	<slot />
</Dashboard>

<Dialog
	cancelText={dialog.value.cancelText}
	confirmText={dialog.value.confirmText}
	message={dialog.value.message}
	resolve={dialog.value.resolve}
	isOpen={dialog.value.show}
	title={dialog.value.title}
/>
