<script lang="ts">
	import { goto } from '$app/navigation';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte';
	import { Routes } from '$lib/consts';

	import { onMount, type Snippet } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto(Routes.LOGIN);
			}
		});
	});
</script>

<Dashboard>
	{@render children()}
</Dashboard>

<Dialog
	cancelText={dialog.value.cancelText}
	confirmText={dialog.value.confirmText}
	message={dialog.value.message}
	resolve={dialog.value.resolve}
	isOpen={dialog.value.show}
	title={dialog.value.title}
/>
