<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import DueToDos from './DueToDos.svelte';

	export const meta = {
		argTypes: {},
		component: DueToDos,
	} satisfies Meta<DueToDos>;
</script>

<Template let:args>
	<div class="w-24">
		<DueToDos {...args} />
	</div>
</Template>

<Story args={{ toDos: [workToDo] }} name="OneDueToDo" />

<Story args={{ toDos: [birthdayToDo] }} name="OneToDo" />

<Story args={{ toDos }} name="ManyToDos" />
