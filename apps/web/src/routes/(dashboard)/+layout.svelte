<script lang="ts">
	import { Dialog, dialog } from '@life/shared';
	import { onAuthStateChanged } from 'firebase/auth';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { setUser } from '$lib/user/user.utils.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
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
	isOpen={dialog.value.show}
	message={dialog.value.message}
	resolve={dialog.value.resolve}
	title={dialog.value.title}
/>
