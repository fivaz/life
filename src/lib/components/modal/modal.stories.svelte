<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Modal from './Modal.svelte';

	export const meta = {
		argTypes: {},
		component: Modal,
	} satisfies Meta<Modal>;
</script>

<Template let:args>
	<Modal {...args} />
</Template>

<Story args={{ show: true }} let:args name="Modal">
	<Modal {...args}><p class="p-5">Dialog</p></Modal>
</Story>

<Story args={{ show: true }} let:args name="Form">
	<Modal {...args}>
		<div>Test</div>
	</Modal>
</Story>
