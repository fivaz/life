<script lang="ts">
	import { signOut } from 'firebase/auth';

	import { currentUser } from '$lib/auth/utils.svelte';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';

	const list = [
		{ label: 'Profile', onclick: () => history.pushState({}, '', Routes.PROFILE) },
		{
			label: 'Sign out',
			onclick: async () => {
				await signOut(auth);
				history.pushState({}, '', Routes.LOGIN);
			},
		},
	];
</script>

<DropDown class="w-32" position="top-right" {list}>
	<span class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50">
		<img alt="avatar" class="h-8 w-8 rounded-full" src={currentUser.photoURL} />
		<span class="text-sm font-semibold text-gray-900">{currentUser.displayName}</span>
	</span>
</DropDown>
