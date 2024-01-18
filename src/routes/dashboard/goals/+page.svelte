<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { closeModal, isModalVisible, openModal } from '$lib/form-modal/store';
	import { goals } from '$lib/goal/store';
	import type { ActionData, PageData } from './$types';
	import GoalForm from './goal-form/GoalForm.svelte';
	import GoalRow from './goal-row/GoalRow.svelte';
	import { buildEmptyGoal, convertToGoalIn } from './service';

	export let form: ActionData | null = null;

	export let data: PageData;

	let editingGoal = buildEmptyGoal();

	goals.set(data.goals);
</script>

<div class="flex flex-col gap-5">
	<div class="flex justify-end">
		<Button
			on:click={() => {
				openModal();
				editingGoal = buildEmptyGoal();
			}}
		>
			create goal
		</Button>
	</div>

	<ul role="list" class="divide-y divide-gray-100">
		{#each $goals as goal (goal)}
			<GoalRow
				{goal}
				on:edit={(e) => {
					openModal();
					editingGoal = convertToGoalIn(e.detail);
				}}
			/>
		{/each}
	</ul>

	<Modal show={$isModalVisible} on:close={() => closeModal()}>
		<GoalForm {form} goal={editingGoal} />
	</Modal>
</div>
