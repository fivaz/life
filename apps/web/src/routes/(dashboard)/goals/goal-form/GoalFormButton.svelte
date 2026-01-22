<script lang="ts">
	import { Button, IconRender, IconSelector, LInput, LText, ModalForm } from '@life/shared';
	import { Plus } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { buildEmptyGoal, removeGoalChildren } from '$lib/goal/goal.model';
	import { addGoal, deleteGoal, editGoal } from '$lib/goal/goal.repository';
	import { goals } from '$lib/goal/goal.svelte';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import type { HierarchicalGoal } from '../goals-by-parent/service';
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

	let goalIn = $state<Goal>(buildEmptyGoal());

	let isOpen = $state((() => debug)());

	function close() {
		isOpen = false;
		errorMessage = '';
	}

	function open() {
		if (goal.id) console.log(goal.id);
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
			<IconRender name={goal.icon} class="size-5" />
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
		<LInput inputClass="pr-10 w-full" placeholder="Name" bind:value={goalIn.name} />
		<div class="absolute top-0 right-0 p-2.5">
			<LText>
				<IconRender name={goalIn.icon} class="size-5" />
			</LText>
		</div>
	</div>

	<Toggle label="Is complete" bind:value={goalIn.isDone} />

	<LInput
		class="flex items-center"
		inputClass="flex-1"
		label="Start at"
		labelClass="w-1/5"
		type="date"
		bind:value={goalIn.startDate}
	/>

	<LInput
		class="flex items-center"
		inputClass="flex-1"
		label="Deadline"
		labelClass="w-1/5"
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
