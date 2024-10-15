<script lang="ts">
	import type { User } from '$lib/utils/store';

	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import ProfileDropUp from '$lib/components/dashboard/profile-drop-up/ProfileDropUp.svelte';
	import { Routes } from '$lib/consts';
	import {
		CalendarDays,
		ChartCandlestick,
		ClipboardList,
		Goal,
		ListTodo,
		Tags,
	} from 'lucide-svelte';

	let className = '';
	export { className as class };

	export let currentUser: User;

	const navigation = [
		{ href: Routes.HOME, icon: CalendarDays, name: 'Calendar' },
		{ href: Routes.CATEGORIES, icon: Tags, name: 'Categories' },
		{ href: Routes.TASKS, icon: ClipboardList, name: 'Tasks' },
		{ href: Routes.GOALS, icon: Goal, name: 'Goals' },
		{ href: Routes.REPORT, icon: ChartCandlestick, name: 'Report' },
		{ href: Routes.ROUTINE, icon: ListTodo, name: 'Routine' },
	];
</script>

<div class="h-full w-64 bg-white {className} flex flex-col items-stretch gap-5 p-3">
	<Logo class="h-8 w-auto self-start text-indigo-600" />

	<nav class="flex-1">
		<ul>
			{#each navigation as item (item.name)}
				<li>
					<a
						class=" flex items-center gap-3 rounded-lg p-2 {$page.url.pathname === item.href
							? 'bg-gray-50 text-indigo-600'
							: 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}"
						href={item.href}
						on:click
					>
						<!-- eslint-disable perfectionist/sort-svelte-attributes -->
						<svelte:component this={item.icon} class="h-6 w-6" />
						<!-- eslint-enable perfectionist/sort-svelte-attributes -->
						<span class="text-sm font-semibold">
							{item.name}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="fixed bottom-0 left-0">
		<ProfileDropUp>
			<div class="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50">
				<img alt="avatar" class="h-8 w-8 rounded-full" src={currentUser?.photoURL} />
				<span class="text-sm font-semibold text-gray-900">{currentUser?.displayName}</span>
			</div>
		</ProfileDropUp>
	</div>
</div>
