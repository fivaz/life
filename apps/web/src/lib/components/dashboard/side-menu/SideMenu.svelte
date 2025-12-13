<script lang="ts">
	import {
		CalendarDays,
		ChartCandlestick,
		ClipboardList,
		Goal,
		Tags,
		TimerIcon,
	} from 'lucide-svelte';
	import type { Component } from 'svelte';

	import { page } from '$app/state';
	import ProfileDropUp from '$lib/components/dashboard/profile-drop-up/ProfileDropUp.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { Routes } from '$lib/consts';

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

<section class="{klass} flex h-full w-64 flex-col items-stretch gap-5 p-3">
	<div class="flex items-center gap-2 text-indigo-500">
		<Logo class="size-8 self-start" />
		<h2 class="text-lg font-semibold">Life</h2>
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
</section>

{#snippet link(
	label: string,
	href: string,
	Icon: Component | typeof CalendarDays,
	hasTimer = false,
)}
	<li>
		<a
			class="{page.url.pathname === href ? 'text-indigo-500' : 'text-gray-700 dark:text-gray-100'}
			flex items-end gap-3 rounded-lg p-2 hover:bg-indigo-600 hover:text-white"
			{href}
		>
			<Icon class="size-6" />
			<span class="text-sm font-semibold">{label}</span>
			{#if hasTimer && timer.status !== 'stopped'}
				<Timer class="text-sm font-semibold" />
			{/if}
		</a>
	</li>
{/snippet}
