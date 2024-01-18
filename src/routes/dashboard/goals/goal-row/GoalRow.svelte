<script lang="ts">
	import { CheckBadge } from '@steeze-ui/heroicons';
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import type { GGoal } from '$lib/goal/utils';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let goal: GGoal;

	let dispatch = createEventDispatcher<{ edit: GGoal; remove: GGoal }>();
</script>

<li class={classnames('flex items-center justify-between gap-x-6 rounded-lg p-3 bg-blue-500')}>
	<div class="flex items-center gap-x-2">
		<div class="text-sm font-semibold leading-6 text-gray-50">{goal.name}</div>
		{#if goal.isDone} <Icon src={CheckBadge} class="h-6 w-6 text-white" /> {/if}
	</div>

	<div>
		<Button on:click={() => dispatch('edit', goal)} type="button">
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
	</div>
</li>
