<script lang="ts">
	import { Button, LText } from '@life/shared';
	import { Save, XIcon } from 'lucide-svelte';

	import Input from '$lib/components/form/input/Input.svelte';

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
	<div class="rounded-t-md bg-neutral-100 px-4 py-5 sm:p-4 dark:bg-neutral-900">
		<div class="flex items-center justify-between pb-2">
			<LText class="text-lg font-medium">Edit Timer</LText>

			<Button color="white" onclick={close} padding="p-1.5"><XIcon class="size-5" /></Button>
		</div>

		<div class="flex items-center justify-center gap-2">
			<Input max="60" min="0" placeholder="Min" type="number" bind:value={minutesIn} />
			<LText class="text-xl">:</LText>
			<Input max="60" min="0" type="number" bind:value={secondsIn} />
		</div>
	</div>

	<div
		class="flex justify-center rounded-b-md bg-gray-50 px-4 py-3 text-right sm:px-6 dark:bg-neutral-950"
	>
		<Button type="submit"><Save class="h-5 w-5 text-white" />Save</Button>
	</div>
</form>
