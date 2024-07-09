<script context="module" lang="ts">
	import type { Meta } from '@storybook/svelte';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/seed';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import ToDosPanel from './TasksSummary.svelte';

	export const meta = {
		argTypes: {},
		component: ToDosPanel,
	} satisfies Meta<ToDosPanel>;
</script>

<Template let:args>
	<div class="w-24">
		<ToDosPanel {...args} />
	</div>
</Template>

<Story args={{ toDos: [workToDo] }} name="OneDueToDo" />

<Story args={{ toDos: [birthdayToDo] }} name="OneToDo" />

<Story args={{ toDos }} name="ManyToDos" />
