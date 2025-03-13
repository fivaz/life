<script lang="ts">
	import { Button } from '@life/shared';
	import { Save, XIcon } from 'lucide-svelte';

	interface Props {
		time: number;
		close: () => void;
	}

	let { close, time = $bindable() }: Props = $props();

	let minutesIn = $state(30);
	let secondsIn = $state(0);

	function onSubmit() {
		time = minutesIn * 60 + secondsIn;
		close();
	}
</script>

<form class="relative w-[300px] gap-5 text-sm font-medium shadow" onsubmit={onSubmit}>
	<div class="rounded-t-md bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">Edit Timer</h2>

			<Button color="white" onclick={close}><XIcon class="size-5" /></Button>
		</div>

		<div class="flex justify-center gap-2">
			<input
				class="block w-16 rounded-md border border-gray-300 p-2 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				max="60"
				min="0"
				placeholder="Minutes"
				type="number"
				bind:value={minutesIn}
			/>
			<span class="text-xl">:</span>
			<input
				class="block w-16 rounded-md border border-gray-300 p-2 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				max="60"
				min="0"
				placeholder="Seconds"
				type="number"
				bind:value={secondsIn}
			/>
		</div>
	</div>

	<div class="flex justify-center rounded-b-md bg-gray-50 px-4 py-3 sm:px-6">
		<Button type="submit"><Save class="h-5 w-5 text-white" />Save</Button>
	</div>
</form>
