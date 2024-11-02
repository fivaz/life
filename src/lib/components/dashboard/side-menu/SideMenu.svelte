<script lang="ts">
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
	import { PUBLIC_COMMIT_HASH } from '$env/static/public';
	import Tooltip from '$lib/components/tooltip/Tooltip.svelte';

	interface Props {
		class?: string;
	}

	let { class: klass }: Props = $props();

	const navigation = [
		{ href: Routes.ROOT, icon: CalendarDays, name: 'Calendar' },
		{ href: Routes.CATEGORIES, icon: Tags, name: 'Categories' },
		{ href: Routes.TASKS, icon: ClipboardList, name: 'Tasks' },
		{ href: Routes.GOALS, icon: Goal, name: 'Goals' },
		{ href: Routes.REPORT, icon: ChartCandlestick, name: 'Report' },
		{ href: Routes.ROUTINE, icon: ListTodo, name: 'Routine' },
	];
</script>

<div class="{klass} flex h-full w-64 flex-col items-stretch gap-5 bg-white p-3">
	<div class="flex items-center gap-2 text-indigo-600">
		<Logo class="h-8 w-auto self-start" />
		<Tooltip class="bg-indigo-50" text="current commit: {PUBLIC_COMMIT_HASH}">
			<h2 class="text-lg font-semibold">Life</h2>
		</Tooltip>
	</div>

	<nav class="flex-1">
		<ul>
			{#each navigation as item (item.name)}
				<li>
					<a
						class="flex items-center gap-3 rounded-lg p-2
							{$page.url.pathname === item.href
							? 'bg-gray-50 text-indigo-600'
							: 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}"
						href={item.href}
					>
						<item.icon class="h-6 w-6" />
						<span class="text-sm font-semibold">
							{item.name}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<ProfileDropUp />
</div>
