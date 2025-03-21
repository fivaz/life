<script lang="ts">
	import { LText } from '@life/shared';
	import { signOut } from 'firebase/auth';
	import { MoonIcon, SunIcon } from 'lucide-svelte';

	import { goto } from '$app/navigation';
	import DropDownItem from '$lib/components/drop-down/drop-down-item/DropDownItem.svelte';
	import DropDown from '$lib/components/drop-down/DropDown.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/user/user.utils.svelte';
	import { darkMode } from '$lib/utils.svelte';
</script>

<div class="flex justify-between gap-2">
	<DropDown placement="top-end">
		{#snippet button()}
			<span class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
				<img class="size-8 rounded-full" alt="avatar" src={currentUser.photoURL} />
				<LText class="text-sm font-semibold">{currentUser.displayName}</LText>
			</span>
		{/snippet}
		<DropDownItem href={Routes.PROFILE}>Profile</DropDownItem>
		<DropDownItem
			onclick={async () => {
				await signOut(auth);
				void goto(Routes.LOGIN);
			}}
		>
			Sign out
		</DropDownItem>
	</DropDown>
	<Toggle
		class="px-2"
		offColor="text-yellow-600"
		offColorBackground="bg-yellow-500"
		offIcon={SunIcon}
		onColor="text-indigo-600"
		onColorBackground="bg-indigo-500"
		onIcon={MoonIcon}
		bind:value={darkMode.value}
	/>
</div>
