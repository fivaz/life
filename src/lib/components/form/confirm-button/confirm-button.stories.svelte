<script context="module" lang="ts">
	import { dialog } from '$lib/components/dialog/service';

	import ConfirmButton from './ConfirmButton.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: ConfirmButton,
	});
</script>

<script>
	import Dialog from '$lib/components/dialog/Dialog.svelte';
</script>

<Story args={{}} name="Primary">
	<Dialog
		cancelText={$dialog.cancelText}
		confirmText={$dialog.confirmText}
		message={$dialog.message}
		resolve={$dialog.resolve}
		isShown={$dialog.show}
		title={$dialog.title}
	/>

	<ConfirmButton confirm={() => console.log('confirmed')}>button</ConfirmButton>
</Story>
