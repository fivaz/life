<script lang="ts">
	import { LText } from '@life/shared';
	import { signOut } from 'firebase/auth';
	import { MoonIcon, SunIcon } from 'lucide-svelte';

	import { goto } from '$app/navigation';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
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

	let isDark = $state(getDarkMode());

	function getDarkMode() {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		return (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);

		// Whenever the user explicitly chooses light mode
		// localStorage.theme = 'light'

		// Whenever the user explicitly chooses dark mode
		// localStorage.theme = 'dark'

		// Whenever the user explicitly chooses to respect the OS preference
		// localStorage.removeItem('theme')
	}

	// Watch for changes in isDark and update localStorage + class
	$effect(() => {
		localStorage.theme = isDark ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', isDark);
	});
</script>

<div class="flex justify-between gap-2">
	<DropDown class="w-32" {list} position="top-right">
		<span class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
			<img class="h-8 w-8 rounded-full" alt="avatar" src={currentUser.photoURL} />
			<LText class="text-sm font-semibold">{currentUser.displayName}</LText>
		</span>
	</DropDown>
	<Toggle
		class="px-2"
		offColor="text-yellow-600"
		offColorBackground="bg-yellow-500"
		offIcon={SunIcon}
		onColor="text-indigo-600"
		onColorBackground="bg-indigo-500"
		onIcon={MoonIcon}
		bind:value={isDark}
	/>
</div>
