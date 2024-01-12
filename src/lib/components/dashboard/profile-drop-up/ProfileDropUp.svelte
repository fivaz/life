<script lang="ts">
	import { Transition, Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import { profileRoute } from '$lib/consts';
	import classnames from 'classnames';
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
			class="-top-2 transform -translate-y-full absolute left-0 w-32 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<MenuItem let:active>
				<a
					href={profileRoute}
					class={classnames(
						active ? 'bg-gray-50' : '',
						'block px-3 py-1 text-sm leading-6 text-gray-900',
					)}
				>
					Profile
				</a>
			</MenuItem>
			<MenuItem let:active>
				<form method="POST" action={`${profileRoute}?/logout`}>
					<button
						class={classnames(
							active ? 'bg-gray-50' : '',
							'w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900',
						)}
					>
						Sign out
					</button>
				</form>
			</MenuItem>
		</MenuItems>
	</Transition>
	<MenuButton>
		<slot />
	</MenuButton>
</Menu>
