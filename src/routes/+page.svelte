<script lang="ts">
	import { Loader2 } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { goto } from '$app/navigation';
	import { homeRoute, loginRoute } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			goto(user ? homeRoute : loginRoute);
		});
	});
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex gap-3">
		<Icon src={Loader2} class="animate-spin h-6 w-6" />
		<p class="font-semibold">Loading...</p>
	</div>
</div>
