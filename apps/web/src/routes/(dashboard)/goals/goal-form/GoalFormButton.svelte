<script lang="ts">
	import { Button, GoalIcon, LText, ModalForm } from '@life/shared';
	import { getIcon } from '@life/shared/goal';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { removeGoalChildren } from '$lib/goal/goal.model';
	import { addGoal, deleteGoal, editGoal } from '$lib/goal/goal.repository';
	import { useGoals } from '$lib/goal/goal.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import type { HierarchicalGoal } from '../goals-by-parent/service';
	import IconSelector from './icon-selector/IconSelector.svelte';
	import { checkErrors } from './service';

	interface Props {
		goal: Goal | HierarchicalGoal;
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none' | 'dark' | 'light';
		class?: string;
		padding?: string;
		debug?: boolean;
	}

	let { goal, children, color, class: klass, padding, debug = false }: Props = $props();

	let errorMessage = $state('');

	let goalIn = $state({ ...goal });

	let isOpen = $state(debug);

	let goals = useGoals();

	function close() {
		isOpen = false;
	}

	function open() {
		goalIn = removeGoalChildren(goal);
		isOpen = true;
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(goalIn);
		if (errorMessage) {
			return;
		}

		if (goalIn.id) {
			editGoal(goalIn, currentUser.uid);
		} else {
			addGoal(goalIn, currentUser.uid);
		}
		close();
	}

	let selectGoals = $derived.by(() => {
		const otherGoals = goals.value.filter((existingGoal) => existingGoal.id !== goal.id);
		return otherGoals.toSorted((a, b) => {
			if (a.isDone === b.isDone) return 0;
			return a.isDone ? 1 : -1;
		});
	});
</script>

<Button class={klass} {color} onclick={open} {padding}>
	{#if children}
		{@render children()}
	{:else}
		<Plus class="size-4" />
		New Goal
	{/if}
</Button>

{#snippet goalItem(goal: Goal | undefined)}
	{#if goal}
		<div class="flex gap-2">
			<GoalIcon name={goal.icon} class="size-5" />
			<span class="w-[calc(100%-20px)] truncate">{goal.name}</span>
		</div>
	{:else}
		<span>no parent</span>
	{/if}
{/snippet}

<ModalForm
	name="Goal"
	{close}
	{errorMessage}
	isEditing={!!goal.id}
	onDelete={() => deleteGoal(goal.id, currentUser.uid, close)}
	{onSubmit}
	bind:isOpen
>
	<div class="relative">
		<Input inputClass="pr-10 w-full" placeholder="Name" bind:value={goalIn.name} />
		<div class="absolute right-0 top-0 p-2.5">
			<LText>
				<GoalIcon class="size-5" icon={getIcon(goalIn.icon)} />
			</LText>
		</div>
	</div>

	<Toggle label="Is complete" bind:value={goalIn.isDone} />

	<Input
		class="flex items-center gap-2"
		inputClass="flex-1 w-full"
		label="Deadline"
		type="date"
		bind:value={goalIn.deadline}
	/>

	<Select
		class="flex items-center"
		label="Goal"
		labelClass="w-1/5"
		selectClass="flex-1"
		bind:value={goalIn.parent}
	>
		{#snippet placeholder()}
			{@const selectedGoal = goals.value.find((goal) => goal.id === goalIn.parent)}
			{@render goalItem(selectedGoal)}
		{/snippet}

		<SelectItem value="">no parent</SelectItem>
		{#each selectGoals as goal (goal.id)}
			<SelectItem value={goal.id}>
				{@render goalItem(goal)}
			</SelectItem>
		{/each}
	</Select>

	<IconSelector name="icon" bind:value={goalIn.icon} />
</ModalForm>
