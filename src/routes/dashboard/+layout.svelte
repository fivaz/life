<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service';
	import { Routes, dashboardRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user && $page.url.pathname.startsWith(dashboardRoute)) {
				goto(Routes.LOGIN);
			}
		});
	});
</script>

<Dashboard>
	{@render children?.()}
</Dashboard>

<Dialog
	cancelText={$dialog.cancelText}
	confirmText={$dialog.confirmText}
	message={$dialog.message}
	resolve={$dialog.resolve}
	isShown={$dialog.show}
	title={$dialog.title}
/>
