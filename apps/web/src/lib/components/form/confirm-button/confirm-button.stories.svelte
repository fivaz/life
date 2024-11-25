<script lang="ts" module>
	import type { Args } from '@storybook/addon-svelte-csf';
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

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
		isOpen={dialog.value.show}
		message={dialog.value.message}
		resolve={dialog.value.resolve}
		title={dialog.value.title}
	/>

	<ConfirmButton {...args} confirm={() => console.log('confirmed')}>button</ConfirmButton>
{/snippet}

<Story name="Primary" args={{}} />
