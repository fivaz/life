<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';

	import DesktopDialog from './desktop-dialog/DesktopDialog.svelte';
	import MobileDialog from './mobile-dialog/MobileDialog.svelte';
	import { closeDialog } from './service.svelte';

	interface Props {
		isOpen: boolean;
		title: string;
		message?: string;
		confirmText: string;
		cancelText: string;
		resolve: (value: boolean | null) => void;
	}

	let { isOpen, resolve, ...props }: Props = $props();

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
	<DesktopDialog
		class="hidden sm:flex"
		cancelFunc={cancel}
		closeFunc={close}
		confirmFunc={confirm}
		{...props}
	/>
	<MobileDialog class="flex sm:hidden" cancelFunc={cancel} confirmFunc={confirm} {...props} />
</Modal>
