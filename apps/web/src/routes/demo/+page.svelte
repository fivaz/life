<script lang="ts">
	import { LText } from '@life/shared';
	import LoaderIcon from '@lucide/svelte/icons/loader';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { demoLogin, Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';

	onMount(async () => {
		await signInWithEmailAndPassword(auth, demoLogin.email, demoLogin.password);
		void goto(Routes.ROOT);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<LText class="flex gap-3">
		<LoaderIcon class="size-6 animate-spin" />
		<span class="font-semibold">You are entering demo mode...</span>
	</LText>
</div>
