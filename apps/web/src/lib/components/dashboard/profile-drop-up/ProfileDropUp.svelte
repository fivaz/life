<script lang="ts">
	import { signOut } from 'firebase/auth';

	import { goto } from '$app/navigation';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/user/user.utils.svelte';

	const list = [
		{ label: 'Profile', onclick: () => goto(Routes.PROFILE) },
		{
			label: 'Sign out',
			onclick: async () => {
				await signOut(auth);
				void goto(Routes.LOGIN);
			},
		},
	];
</script>

<DropDown class="w-32" {list} position="top-right">
	<span class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50">
		<img class="h-8 w-8 rounded-full" alt="avatar" src={currentUser.photoURL} />
		<span class="text-sm font-semibold text-gray-900">{currentUser.displayName}</span>
	</span>
</DropDown>
