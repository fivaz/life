<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { buildEmptyTaskIn } from '$lib/components/task-form/service';
	import TaskForm from '$lib/components/task-form/TaskForm.svelte';
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
		<TaskForm targetDate={null} task={buildEmptyTaskIn(categories, true)} />
	</Modal>
</Story>
