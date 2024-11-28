<script lang="ts">
	import '@unocss/reset/tailwind.css';

	import CalendarCheck from 'lucide-svelte/icons/check-check';

	import Button from '$lib/components/button/Button.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { createDialog, dialog } from '$lib/components/dialog/service.svelte.js';
</script>

<Dialog
	cancelText={dialog.value.cancelText}
	confirmText={dialog.value.confirmText}
	isOpen={dialog.value.show}
	message={dialog.value.message}
	resolve={dialog.value.resolve}
	title={dialog.value.title}
/>

<Button
	color="white"
	onclick={() =>
		createDialog({
			title: 'Delete event ?',
		})}
>
	open dialog
</Button>
