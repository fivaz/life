<script lang="ts">
	import type { Snippet } from 'svelte';

	import Button from '$lib/components/button/Button.svelte';
	import LText from '$lib/components/LText.svelte';
	import Alert from '$lib/components/modal/alert/Alert.svelte';
	import CloseX from '$lib/components/modal/close-x/CloseX.svelte';
	import ConfirmButton from '$lib/components/modal/confirm-button/ConfirmButton.svelte';

	interface Props {
		close: () => void;
		onSubmit: (e: SubmitEvent) => void;
		onDelete: () => void;
		isEditing: boolean;
		errorMessage: string;
		children: Snippet;
	}

	let { isEditing, close, onSubmit, onDelete, errorMessage, children }: Props = $props();
</script>

<form class="relative w-[355px] text-sm font-medium shadow" onsubmit={onSubmit}>
	<div class="rounded-t-md bg-neutral-100 px-4 py-5 sm:p-4 dark:bg-neutral-900">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
				{isEditing ? 'Edit Category' : 'Add Category'}
			</h2>

			<LText><CloseX {close} /></LText>
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			{@render children()}
		</div>
	</div>

	<div
		class="flex justify-between rounded-b-md bg-gray-50 px-4 py-3 text-right sm:px-6 dark:bg-neutral-950"
	>
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
