<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { type ComponentProps } from 'svelte';

	import { Dialog, dialog } from '../../../../../dist/index.js';
	import ConfirmButton from './ConfirmButton.svelte';

	const { Story } = defineMeta({
		component: ConfirmButton,
		render: template,
	});

	type Args = ComponentProps<typeof ConfirmButton>;
</script>

{#snippet template({ children, ...args }: Args)}
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
