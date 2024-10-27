<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/consts';
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isOpen = $state(false);

	function handleClickOutside() {
		if (isOpen) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleIsOpen(event: MouseEvent) {
		event.stopPropagation();
		isOpen = !isOpen;
	}
</script>

<div class="relative inline-block text-left">
	<!--	<div-->
	<!--		enter="transition ease-out duration-50"-->
	<!--		enterFrom="transform opacity-0 scale-95"-->
	<!--		enterTo="transform opacity-100 scale-100"-->
	<!--		leave="transition ease-in duration-75"-->
	<!--		leaveFrom="transform opacity-100 scale-100"-->
	<!--		leaveTo="transform opacity-0 scale-95"-->
	<!--	>-->
	{#if isOpen}
		<ul
			class="absolute -top-2 left-0 w-32 origin-top-right -translate-y-full transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			transition:fade
		>
			<li>
				<a
					class="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50"
					href={Routes.PROFILE}
				>
					Profile
				</a>
			</li>
			<li>
				<button
					class="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50"
					onclick={async () => {
						await signOut(auth);
						void goto(Routes.LOGIN);
					}}
				>
					Sign out
				</button>
			</li>
		</ul>
		<!--		</div>-->
	{/if}
	<button class="w-full" onclick={toggleIsOpen}>
		{@render children()}
	</button>
</div>
