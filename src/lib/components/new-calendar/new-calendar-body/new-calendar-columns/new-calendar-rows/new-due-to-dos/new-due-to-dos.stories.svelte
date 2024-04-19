<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { toDos, workToDo } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import NewDueToDos from './NewDueToDos.svelte';

	export const meta = {
		argTypes: {},
		component: NewDueToDos,
	} satisfies Meta<NewDueToDos>;
</script>

<Template let:args>
	<div class="w-24">
		<NewDueToDos {...args} />
	</div>
</Template>

<Story args={{ toDos: [workToDo] }} name="OneToDo" />

<Story args={{ toDos }} name="ManyToDos" />
