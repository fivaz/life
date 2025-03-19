<script lang="ts">
	import TriangleAlertIcon from 'lucide-svelte/icons/triangle-alert';
	import XIcon from 'lucide-svelte/icons/x';

	import Button from '$lib/components/button/Button.svelte';
	import LText from '$lib/components/LText.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	import { closeDialog } from './service.svelte';

	interface Props {
		isOpen: boolean;
		title: string;
		message?: string;
		confirmText: string;
		cancelText: string;
		resolve: (value: boolean | null) => void;
	}

	let { isOpen, title, message = '', confirmText, cancelText, resolve }: Props = $props();

	function confirm() {
		resolve(true);
		closeDialog();
	}

	function cancel() {
		resolve(false);
		closeDialog();
	}

	function close() {
		resolve(null);
		closeDialog();
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (isOpen && e.key === 'Enter') {
			confirm();
		}
	}}
/>

<Modal {close} isDialog {isOpen}>
	<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		<div
			class="sm:min-w-auto relative min-w-56 transform overflow-hidden rounded-lg border border-gray-200 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
				<Button color="white" onclick={close} padding="p-1.5" type="button">
					<XIcon class="size-5" />
				</Button>
			</div>
			<div class="flex flex-col items-center sm:flex-row">
				<div
					class="mx-auto flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
				>
					<TriangleAlertIcon class="size-6 text-red-600" aria-hidden="true" />
				</div>
				<div class="mt-3 flex flex-col gap-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<!--pr-6 to prevent the X button to cover the end of the title-->
					<LText class="text-base font-semibold leading-6 sm:pr-6">{title}</LText>
					{#if message}
						<LText class="text-sm text-gray-500">
							{message}
						</LText>
					{/if}
				</div>
			</div>
			<div class="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex sm:flex-row-reverse">
				<Button class="w-full sm:w-auto" color="red" onclick={confirm} type="button">
					{confirmText}
				</Button>
				<Button class="w-full sm:w-auto" color="white" onclick={cancel} type="button">
					{cancelText}
				</Button>
			</div>
		</div>
	</div>
</Modal>
