<script lang="ts">
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import XIcon from '@lucide/svelte/icons/x';

	import Button from '$lib/components/button/Button.svelte';
	import LText from '$lib/components/LText.svelte';

	interface Props {
		title: string;
		message?: string;
		confirmText: string;
		cancelText: string;
		confirmFunc?: () => void;
		cancelFunc?: () => void;
		class: string;
	}

	let {
		title,
		message = '',
		confirmText,
		cancelText,
		confirmFunc,
		cancelFunc,
		class: klass,
	}: Props = $props();
</script>

<div class="{klass} flex min-h-full items-end">
	<div
		class="flex w-full flex-col justify-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="flex items-center justify-center gap-2">
			<div class="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
				<TriangleAlertIcon class="size-5 text-red-600" aria-hidden="true" />
			</div>

			<LText class="text-base font-semibold leading-6">{title}</LText>
		</div>

		{#if message}
			<LText class="text-sm text-gray-500">
				{message}
			</LText>
		{/if}

		<Button class="w-full justify-center" color="red" onclick={confirmFunc} type="button">
			{confirmText}
		</Button>

		<Button class="w-full justify-center" color="white" onclick={cancelFunc} type="button">
			{cancelText}
		</Button>
	</div>
</div>
