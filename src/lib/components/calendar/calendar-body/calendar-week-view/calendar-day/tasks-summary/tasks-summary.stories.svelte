<script module lang="ts">
	import { type Args, defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	import { birthdayToDo, toDos, workToDo } from '$lib/task/seed';

	import TasksSummary from './TasksSummary.svelte';

	const { Story } = defineMeta({
		component: TasksSummary,
		args: {
			date: new Date(),
		},
	});
</script>

<script lang="ts">
	setTemplate(template);
</script>

{#snippet template(args: Args<typeof Story> | any)}
	<div class="w-24">
		<TasksSummary {...args} />
	</div>
{/snippet}

<Story args={{ tasks: [workToDo] }} name="OneDueToDo" />

<Story args={{ tasks: [birthdayToDo] }} name="OneToDo" />

<Story args={{ tasks: toDos }} name="ManyToDos" />
