<script lang="ts">
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/loading/Loading.svelte';
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

<Loading loading />
