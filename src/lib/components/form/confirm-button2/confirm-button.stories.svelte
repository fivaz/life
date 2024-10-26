<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { dialog } from '$lib/components/dialog/service';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ConfirmButton from './ConfirmButton.svelte';

	export const meta = {
		component: ConfirmButton,
	} satisfies Meta<ConfirmButton>;
</script>

<script>
	import Dialog from '$lib/components/dialog/Dialog.svelte';
</script>

<Template let:args>
	<Dialog
		cancelText={$dialog.cancelText}
		confirmText={$dialog.confirmText}
		message={$dialog.message}
		resolve={$dialog.resolve}
		show={$dialog.show}
		title={$dialog.title}
	/>

	<ConfirmButton {...args} on:confirm={() => console.log('confirmed')}>button</ConfirmButton>
</Template>

<Story args={{}} name="Primary" />
