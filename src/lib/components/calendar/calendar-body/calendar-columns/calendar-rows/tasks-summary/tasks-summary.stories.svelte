<script module lang="ts">
	import { type ToDo } from '$lib/task/utils';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/seed';

	import ToDosPanel from './TasksSummary.svelte';

	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		component: ToDosPanel,
	});
</script>

{#snippet template(args: { tasks: ToDo[] })}
	<div class="w-24">
		<ToDosPanel {...args} />
	</div>
{/snippet}

<Story args={{ tasks: [workToDo] }} name="OneDueToDo" children={template} />

<Story args={{ tasks: [birthdayToDo] }} name="OneToDo" children={template} />

<Story args={{ tasks: toDos }} name="ManyToDos" children={template} />
