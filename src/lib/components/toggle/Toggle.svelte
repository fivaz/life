<script lang="ts">
	import { Switch, SwitchLabel, SwitchGroup } from '@rgossiaux/svelte-headlessui';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	export let value = false;

	export let name: string;

	export let label: string = '';

	const dispatch = createEventDispatcher<{ change: boolean }>();

	$: {
		dispatch('change', value);
	}
</script>

<SwitchGroup>
	<input {name} {value} type="hidden" />
	<div class="flex items-center">
		<SwitchLabel class="flex-1 text-start">{label}</SwitchLabel>
		<Switch
			bind:checked={value}
			class={classnames(
				value ? 'bg-blue-600' : 'bg-gray-200',
				'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
			)}
		>
			<span
				class={classnames(
					value ? 'translate-x-6' : 'translate-x-1',
					'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
				)}
			/>
		</Switch>
	</div>
</SwitchGroup>
