<script lang="ts">
	import XIcon from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';

	import Button from '$lib/components/button/Button.svelte';
	import LText from '$lib/components/LText.svelte';
	import Alert from '$lib/components/modal/alert/Alert.svelte';
	import ConfirmButton from '$lib/components/modal/confirm-button/ConfirmButton.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	interface Props {
		close: () => void;
		onSubmit: (e: SubmitEvent) => void;
		onDelete: () => void;
		isEditing: boolean;
		errorMessage: string;
		children: Snippet;
		header?: Snippet;
		name: string;
		isOpen: boolean;
	}

	let {
		isEditing,
		close,
		onSubmit,
		onDelete,
		errorMessage,
		children,
		header,
		name,
		isOpen = $bindable(),
	}: Props = $props();
</script>

<Modal bind:isOpen>
	<form
		class="relative w-[355px] divide-y divide-gray-300 rounded-md border border-gray-400 bg-gray-50 text-sm font-medium dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900"
		onsubmit={onSubmit}
	>
		<div class="rounded-t-md px-4 py-5 sm:p-4">
			<div class="flex items-center justify-between pb-2">
				<LText class="text-lg font-medium">
					{isEditing ? 'Edit ' : 'Add '}
					{name}
				</LText>

				<div class="flex gap-2">
					{@render header?.()}
					<Button color="white" onclick={close} padding="p-1.5" type="button">
						<XIcon class="size-5" />
					</Button>
				</div>
			</div>

			<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
				{errorMessage}
			</Alert>

			<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
				{@render children()}
			</div>
		</div>

		<div class="flex justify-between rounded-b-md px-4 py-3 text-right sm:px-6">
			{#if isEditing}
				<ConfirmButton color="red" confirm={onDelete} confirmByKey="Delete" type="button">
					Delete
				</ConfirmButton>
			{:else}
				<div></div>
			{/if}

			<Button type="submit">
				{#if isEditing}
					Edit
				{:else}
					Add
				{/if}
			</Button>
		</div>
	</form>
</Modal>
