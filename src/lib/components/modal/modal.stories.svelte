<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Modal from './Modal.svelte';

	export const meta = {
		component: Modal,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
		},
		argTypes: {},
	} satisfies Meta<Modal>;
</script>

<Template let:args>
	<Modal {...args} />
</Template>

<Story name="Modal" args={{ show: true }} let:args>
	<Modal {...args}><p class="p-5">Dialog</p></Modal>
</Story>

<Story name="Form" args={{ show: true }} let:args>
	<Modal {...args}>
		<div>Test</div>
	</Modal>
</Story>
