<script lang="ts">
	import type { User } from '$lib/utils/store';

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

<div class="h-full w-64 bg-white {className} flex flex-col gap-3 p-6">
	<div class="p-2">
		<Logo class="h-8 w-auto text-indigo-600" />
	</div>

	<nav class="flex-1">
		<ul>
			{#each navigation as item (item.name)}
				<li>
					<a class="group flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50" href={item.href}>
						<!-- eslint-disable perfectionist/sort-svelte-attributes -->
						<svelte:component
							this={item.icon}
							class="h-6 w-6 text-gray-400 group-hover:text-indigo-600"
						/>
						<!-- eslint-enable perfectionist/sort-svelte-attributes -->
						<span class="text-sm font-semibold text-gray-700 group-hover:text-indigo-600">
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
