<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/dashboard/goals/$types';
	import type { GoalIn } from '../service';
	import { handleSave, handleDelete } from './service';

	export let goal: GoalIn;

	$: isEditing = !!goal.id;

	export let form: ActionData | null;

	let loading = false;

	let error = '';

	const DELETE_ACTION = '?/remove';
	const SAVE_ACTION = '?/save';

	export const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData, data: goal, form });
		} else if (action.search === SAVE_ACTION) {
			return handleSave({ formData, data: goal, form });
		}
	};
</script>

<form
	method="POST"
	action={SAVE_ACTION}
	use:enhance={submit}
	class="w-[355px] shadow rounded-md overflow-hidden relative"
>
	<div class="flex flex-col gap-2 px-4 py-5 bg-white sm:p-6">
		<h2 class="text-lg font-medium text-gray-900">
			{#if isEditing}
				Edit Goal
			{:else}
				Add Goal
			{/if}
		</h2>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}

		<input type="hidden" name="id" value={goal.id} />

		<Input label="Name" autocomplete="off" name="name" bind:value={goal.name} />

		<div class="flex gap-3">
			<Input
				labelClass="w-1/2"
				label="Deadline"
				type="date"
				name="deadline"
				bind:value={goal.deadline}
				required
			/>

			<div class="flex w-1/2 justify-end">
				<label class="flex gap-2 items-center text-sm font-medium text-gray-700">
					Is complete
					<input
						name="isDone"
						type="checkbox"
						bind:checked={goal.isDone}
						class="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
					/>
				</label>
			</div>
		</div>

		<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
			{#if isEditing}
				<Button disabled={loading} formaction="?/remove" color="red">Delete</Button>
			{:else}
				<div />
			{/if}

			<Button disabled={loading} type="submit">
				{#if isEditing} Edit {:else} Add {/if}
			</Button>
		</div>

		<Loading {loading} class="h-8 w-8 text-indigo-500" />
	</div>
</form>
