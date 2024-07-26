<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes, demoLogin } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { LoaderCircle } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		await signInWithEmailAndPassword(auth, demoLogin.email, demoLogin.password);
		void goto(Routes.ROOT);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex gap-3">
		<Icon class="h-6 w-6 animate-spin" src={LoaderCircle} />
		<p class="font-semibold">You are entering demo mode...</p>
	</div>
</div>
