<script lang="ts">
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { createModal } from '$lib/components/dialog/service';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { UnknownError } from '$lib/consts';
	import { removeGoal, updateGoal } from '$lib/goal/store';
	import type { SubSubmitFunction } from '$lib/types-utils';
	import { createEventDispatcher } from 'svelte';
	import type { GoalIn } from '../service';
	import { buildDeadline } from './service';

	export let show: boolean;

	export let goal: GoalIn;

	$: isEditing = !!goal.id;

	let loading = false;

	let error = '';

	const DELETE_ACTION = '?/remove';
	const SAVE_ACTION = '?/save';

	const dispatch = createEventDispatcher<{ close: null }>();

	const handleDelete: SubSubmitFunction<GoalIn> = async () => {
		const result = await createModal({ title: 'Are you sure?' });

		if (!result) {
			return () => {};
		}

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && result.data?.removed) {
				removeGoal(result.data.removed);
			} else if (result.type === 'error') {
				console.log(result.error || UnknownError);
			}
			dispatch('close');
		};
	};

	const handleSave: SubSubmitFunction<GoalIn> = async ({ formData }) => {
		buildDeadline(formData);

		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success' && result.data?.saved) {
				updateGoal(result.data.saved);
			} else if (result.type === 'error') {
				console.log(result.error || UnknownError);
			}
			dispatch('close');
		};
	};

	export const submit: SubmitFunction = async ({ formData, action }) => {
		if (action.search === DELETE_ACTION) {
			return handleDelete({ formData, data: goal });
		} else if (action.search === SAVE_ACTION) {
			return handleSave({ formData, data: goal });
		}
	};
</script>

<Modal {show} on:close>
	<form
		method="POST"
		action={SAVE_ACTION}
		use:enhance={submit}
		class="w-[355px] shadow rounded-md overflow-hidden relative"
	>
		<div class="bg-neutral-100 px-4 py-5 sm:p-4">
			<div class="flex justify-between items-center pb-2">
				<h2 class="text-lg font-medium text-gray-900">
					{#if isEditing}
						Edit Goal
					{:else}
						Add Goal
					{/if}
				</h2>
				<button
					type="button"
					class="pl-2 inline-flex rounded-md p-1.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
					on:click={() => dispatch('close')}
				>
					<span class="sr-only">Dismiss</span>
					<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			<Alert type="error" isVisible={!!error} hasCloseButton={false}>{error}</Alert>

			<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
				<input type="hidden" name="id" value={goal.id} />

				<Input
					class="flex"
					placeholder="Name"
					autocomplete="off"
					name="name"
					bind:value={goal.name}
				/>

				<Input
					class="flex items-center"
					labelClass="w-1/4"
					inputClass="flex-1"
					label="Deadline"
					type="date"
					name="deadline"
					bind:value={goal.deadline}
					required
				/>

				<div class="border border-gray-200 rounded-lg p-2">
					<Toggle name="isDone" label="Is complete" bind:value={goal.isDone} />
				</div>
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
	</form>
</Modal>
