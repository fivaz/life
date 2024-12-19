<script lang="ts">
	import { Button, GoalIcon } from '@life/shared';
	import { categories } from '@life/shared/category';
	import { getIcon } from '@life/shared/goal';

	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { addGoal, deleteGoal, editGoal } from '$lib/goal/goal.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import IconSelector from './icon-selector/IconSelector.svelte';
	import { checkErrors } from './service';

	interface Props {
		goal: Goal;
		close: () => void;
		goals: Goal[];
	}

	let { goal, goals, close }: Props = $props();

	let isEditing = $derived(!!goal.id);

	let errorMessage = $state('');

	let goalIn = $state({ ...goal });

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
		const otherGoals = goals.filter((existingGoal) => existingGoal.id !== goal.id);
		return otherGoals.toSorted((a, b) => {
			if (a.isDone === b.isDone) return 0;
			return a.isDone ? 1 : -1;
		});
	});
</script>

<form
	class="relative w-[355px] overflow-hidden rounded-md text-sm font-medium shadow"
	onsubmit={onSubmit}
>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg text-gray-900">
				{isEditing ? 'Edit Goal' : 'Add Goal'}
			</h2>
			<CloseX {close} />
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-gray-700">
			<div class="relative">
				<Input inputClass="pr-10 w-full" placeholder="Name" bind:value={goalIn.name} />
				<div class="absolute right-0 top-0 p-2.5">
					<GoalIcon class="h-5 w-5" icon={getIcon(goalIn.icon)} />
				</div>
			</div>

			<Input
				class="flex items-center gap-2"
				inputClass="flex-1"
				label="Deadline"
				type="date"
				bind:value={goalIn.deadline}
			/>

			<div class="rounded-lg border border-gray-200 p-2">
				<Toggle label="Is complete" bind:value={goalIn.isDone} />
			</div>

			{#snippet goalItem(goal: Goal | undefined)}
				{#if goal}
					<div class="flex gap-2">
						<GoalIcon name={goal.icon} class="h-5 w-5" />
						<span class="w-[calc(100%-20px)] truncate">{goal.name}</span>
					</div>
				{:else}
					<span>no parent</span>
				{/if}
			{/snippet}

			<Select
				class="flex items-center"
				label="Goal"
				labelClass="w-1/5"
				selectClass="flex-1"
				bind:value={goalIn.parent}
			>
				{#snippet placeholder()}
					{@const selectedGoal = goals.find((goal) => goal.id === goalIn.parent)}
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
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirm={() => deleteGoal(goal.id, currentUser.uid, close)}
				confirmByKey="Delete"
				type="button"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div></div>
		{/if}

		<Button type="submit">
			{#if isEditing}
				Edit
			{:else}
				Add
			{/if}
		</Button>
	</div>
</form>
