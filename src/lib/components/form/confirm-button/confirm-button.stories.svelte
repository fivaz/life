<script module lang="ts">
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { dialog } from '$lib/components/dialog/service.svelte';

	import ConfirmButton from './ConfirmButton.svelte';

	const { Story } = defineMeta({
		component: ConfirmButton,
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story>)}
	<Dialog
		cancelText={dialog.value.cancelText}
		confirmText={dialog.value.confirmText}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		isOpen={dialog.value.show}
		title={dialog.value.title}
	/>

	<ConfirmButton {...args} confirm={() => console.log('confirmed')}>button</ConfirmButton>
{/snippet}

<Story args={{}} name="Primary" />
