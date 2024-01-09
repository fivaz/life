<script lang="ts" context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { categories } from '$lib/category/seed';
	import { buildEmptyTaskIn } from '../../../routes/dashboard/home/calendar/service';
	import TaskForm from '../../../routes/dashboard/home/calendar/task-form/TaskForm.svelte';
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

<script>
</script>

<Template let:args>
	<Modal {...args} />
</Template>

<Story name="Dialog" args={{ show: true }} let:args>
	<Modal {...args}><p class="p-5">Dialog</p></Modal>
</Story>

<Story name="Form" args={{ show: true }} let:args>
	<Modal {...args}>
		<TaskForm form={null} task={buildEmptyTaskIn(categories, true)} />
	</Modal>
</Story>
