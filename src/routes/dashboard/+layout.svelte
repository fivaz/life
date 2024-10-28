<script lang="ts">
	import { goto } from '$app/navigation';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service';
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
	cancelText={$dialog.cancelText}
	confirmText={$dialog.confirmText}
	message={$dialog.message}
	resolve={$dialog.resolve}
	isOpen={$dialog.show}
	title={$dialog.title}
/>
