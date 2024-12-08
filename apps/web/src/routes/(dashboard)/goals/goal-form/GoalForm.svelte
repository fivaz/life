<script lang="ts">
	import { Button, GoalIcon } from '@life/shared';
	import { getIcon } from '@life/shared/goal';

	import CloseX from '$lib/components/close-x/CloseX.svelte';
	import Alert from '$lib/components/form/alert/Alert.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { addGoal, deleteGoal, editGoal } from '$lib/goal/goal.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import IconSelector from './icon-selector/IconSelector.svelte';
	import { checkErrors } from './service';

	interface Props {
		goal: Goal;
		close: () => void;
	}

	let { goal, close }: Props = $props();

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
				required
				type="date"
				bind:value={goalIn.deadline}
			/>

			<div class="rounded-lg border border-gray-200 p-2">
				<Toggle label="Is complete" bind:value={goalIn.isDone} />
			</div>

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
