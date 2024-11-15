<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Alert from '$lib/components/form/alert/Alert.svelte';
	import Button from '$lib/components/form/button/Button.svelte';
	import ConfirmButton from '$lib/components/form/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/form/input/Input.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Goal } from '$lib/goal/goal.model';
	import { addGoal, deleteGoal, editGoal } from '$lib/goal/goal.repository';
	import GoalIcon from '$lib/goal/goal-icon/GoalIcon.svelte';
	import { getIcon } from '$lib/goal/goal-icon/service';

	import IconSelector from './icon-selector/IconSelector.svelte';
	import { checkErrors } from './service';

	interface Props {
		userId: string;
		goal: Goal;
		close: () => void;
	}

	let { userId, goal, close }: Props = $props();

	let isEditing = $derived(!!goal.id);

	let errorMessage = $state('');

	let goalIn = $state({ ...goal });

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = checkErrors(goalIn);
		if (errorMessage) {
			return;
		}

		const { id, ...data } = goalIn;

		if (id) {
			editGoal(id, data, userId);
		} else {
			addGoal(data, userId);
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
			<button
				class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				onclick={close}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<Alert hasCloseButton={false} isVisible={!!errorMessage} type="error">
			{errorMessage}
		</Alert>

		<div class="flex flex-col gap-2 text-gray-700">
			<div class="relative">
				<Input inputClass="pr-10 w-full" bind:value={goalIn.name} placeholder="Name" />
				<div class="absolute right-0 top-0 p-2.5">
					<GoalIcon class="h-5 w-5" icon={getIcon(goalIn.icon)} />
				</div>
			</div>

			<Input
				class="flex items-center gap-2"
				inputClass="flex-1"
				label="Deadline"
				bind:value={goalIn.deadline}
				required
				type="date"
			/>

			<div class="rounded-lg border border-gray-200 p-2">
				<Toggle bind:value={goalIn.isDone} label="Is complete" />
			</div>

			<IconSelector bind:value={goalIn.icon} name="icon" />
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				confirmByKey="Delete"
				confirm={() => deleteGoal(goal.id, userId, close)}
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
