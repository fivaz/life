<script lang="ts">
	import { Settings } from '@steeze-ui/lucide-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '$lib/components/button/Button.svelte';
	import type { EEvent } from '$lib/event/utils';
	import { createEventDispatcher } from 'svelte';

	export let toDo: EEvent;

	let dispatch = createEventDispatcher<{ edit: EEvent; remove: EEvent }>();
</script>

<li class="flex justify-between gap-x-6 py-3">
	<div class="text-sm font-semibold leading-6 text-gray-900">{toDo.name}</div>

	<div>
		<Button on:click={() => dispatch('edit', toDo)} type="button">
			<Icon src={Settings} class="h-4 w-4" />
		</Button>
	</div>
</li>
