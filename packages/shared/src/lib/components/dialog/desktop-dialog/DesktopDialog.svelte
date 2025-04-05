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
		closeFunc?: () => void;
		class: string;
	}

	let {
		title,
		message = '',
		confirmText,
		cancelText,
		confirmFunc,
		cancelFunc,
		closeFunc,
		class: klass,
	}: Props = $props();
</script>

<div
	class="{klass} min-w-auto relative my-8 flex w-full min-w-56 max-w-lg flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6 px-4 pb-4 pt-5 text-left shadow-xl dark:border-gray-700 dark:bg-gray-800"
>
	<div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
		<Button color="white" onclick={closeFunc} padding="p-1.5" type="button">
			<XIcon class="size-5" />
		</Button>
	</div>

	<div class="flex flex-row items-center gap-3">
		<div class="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
			<TriangleAlertIcon class="size-6 text-red-600" aria-hidden="true" />
		</div>

		<div class="flex flex-col gap-2 text-left">
			<!--pr-6 to prevent the X button to cover the end of the title-->
			<LText class="text-base font-semibold leading-6 sm:pr-6">{title}</LText>
			{#if message}
				<LText class="text-sm text-gray-500">
					{message}
				</LText>
			{/if}
		</div>
	</div>
	<div class="flex flex-row-reverse gap-3">
		<Button class="" color="red" onclick={confirmFunc} type="button">
			{confirmText}
		</Button>
		<Button class="" color="white" onclick={cancelFunc} type="button">
			{cancelText}
		</Button>
	</div>
</div>
