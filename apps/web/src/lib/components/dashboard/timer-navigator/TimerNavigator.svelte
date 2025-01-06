<script lang="ts">
	import { Timer as TimerIcon } from 'lucide-svelte';

	import { page } from '$app/stores';
	import { Routes } from '$lib/consts';

	import { timer } from '../../../../routes/(dashboard)/focus/service.svelte';
	import Timer from '../../../../routes/(dashboard)/focus/timer/Timer.svelte';
</script>

<li>
	<a
		class="flex items-end gap-3 rounded-lg p-2
							{$page.url.pathname === Routes.FOCUS
			? 'bg-gray-50 text-indigo-600'
			: 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}"
		href={Routes.FOCUS}
	>
		<TimerIcon class="h-6 w-6" />
		<span class="text-sm font-semibold"> Focus </span>
		{#if timer.status !== 'stopped'}
			<Timer class="text-sm font-semibold text-indigo-600" />
		{/if}
	</a>
</li>
