<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { clsx } from 'clsx';
	import { signOut } from 'firebase/auth';
</script>

<Menu as="div" class="relative inline-block text-left">
	<Transition
		enter="transition ease-out duration-50"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<MenuItems
			class="absolute -top-2 left-0 w-32 origin-top-right -translate-y-full transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<MenuItem let:active>
				<a
					class={clsx(
						active ? 'bg-gray-50' : '',
						'block px-3 py-1 text-sm leading-6 text-gray-900',
					)}
					href={Routes.PROFILE}
					on:click
				>
					Profile
				</a>
			</MenuItem>
			<MenuItem let:active>
				<button
					class={clsx(
						active ? 'bg-gray-50' : '',
						'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900',
					)}
					on:click={async () => {
						await signOut(auth);
						void goto(Routes.LOGIN);
					}}
				>
					Sign out
				</button>
			</MenuItem>
		</MenuItems>
	</Transition>
	<MenuButton class="w-full">
		<slot />
	</MenuButton>
</Menu>
