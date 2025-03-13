<script lang="ts">
	import { LText } from '@life/shared';
	import {
		CalendarDays,
		ChartCandlestick,
		ClipboardList,
		Goal,
		Tags,
		TimerIcon,
	} from 'lucide-svelte';
	import type { Component } from 'svelte';

	import { page } from '$app/stores';
	import { PUBLIC_COMMIT_HASH } from '$env/static/public';
	import ProfileDropUp from '$lib/components/dashboard/profile-drop-up/ProfileDropUp.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { tooltip } from '$lib/components/tooltip/tooltip.action';
	import { Routes } from '$lib/consts';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import { timer } from '../../../../routes/(dashboard)/focus/service.svelte';
	import Timer from '../../../../routes/(dashboard)/focus/timer/Timer.svelte';
	import RoutineIcon from '../../../../routes/(dashboard)/routine/routine-icon/RoutineIcon.svelte';

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
		{ href: Routes.ROUTINE, icon: RoutineIcon, name: 'Routine' },
	];
</script>

<div class="{klass} flex h-full w-64 flex-col items-stretch gap-5 bg-white p-3 dark:bg-gray-900">
	<div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
		<Logo class="h-8 w-auto self-start" />
		<h2 class="text-lg font-semibold" use:tooltip={`current commit: ${PUBLIC_COMMIT_HASH}`}>
			Life
		</h2>
	</div>

	<nav class="flex-1">
		<ul>
			{#each navigation as item (item.name)}
				{@render link(item.name, item.href, item.icon)}
			{/each}

			{@render link('Focus', Routes.FOCUS, TimerIcon, true)}
		</ul>
	</nav>

	<ProfileDropUp />
</div>

{#snippet link(
	label: string,
	href: string,
	Icon: Component | typeof CalendarDays,
	hasTimer = false,
)}
	<li>
		<a
			class="flex items-end gap-3 rounded-lg p-2
							{$page.url.pathname === href
				? 'bg-gray-100 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400'
				: 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 hover:dark:bg-gray-800 hover:dark:text-indigo-400'}"
			{href}
		>
			<span><Icon class="h-6 w-6" /></span>
			<span class="text-sm font-semibold">{label}</span>
			{#if hasTimer && timer.status !== 'stopped'}
				<Timer class="text-sm font-semibold text-indigo-600" />
			{/if}
		</a>
	</li>
{/snippet}
