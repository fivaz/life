<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { modal } from '$lib/components/dialog/service';
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
		cancelText={$modal.cancelText}
		confirmText={$modal.confirmText}
		message={$modal.message}
		resolve={$modal.resolve}
		show={$modal.show}
		title={$modal.title}
	/>

	<ConfirmButton {...args} on:confirm={() => console.log('confirmed')}>button</ConfirmButton>
</Template>

<Story args={{}} name="Primary" />
