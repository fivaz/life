<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte';

	import ConfirmButton from './ConfirmButton.svelte';

	const { Story } = defineMeta({
		component: ConfirmButton,
	});
</script>

<Story args={{}} name="Primary">
	<Dialog
		cancelText={dialog.value.cancelText}
		confirmText={dialog.value.confirmText}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		isOpen={dialog.value.show}
		title={dialog.value.title}
	/>

	<ConfirmButton confirm={() => console.log('confirmed')}>button</ConfirmButton>
</Story>
