<script lang="ts">
	import type { Category } from '$lib/category/utils';

	import { tailwindColors, types } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ConfirmButton from '$lib/components/confirm-button/ConfirmButton.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { getErrors } from '$lib/form-utils';
	import { validator } from '@felte/validator-yup';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import classnames from 'classnames';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { object, string } from 'yup';

	import { addCategory, deleteCategory, editCategory } from './service';

	export let userId: string;

	export let category: Category;

	$: isEditing = !!category.id;

	const dispatch = createEventDispatcher<{ close: null }>();

	const schema = object({
		name: string().required(),
	});

	const { data, errors, form } = createForm({
		extend: [validator({ schema })],
		initialValues: category,
		onSubmit: (values) => {
			const { id, ...data } = values;
			if (id) {
				editCategory(id, data, userId);
			} else {
				addCategory(data, userId);
			}
			dispatch('close');
		},
		validateSchema: schema,
	});
</script>

<form class="w-[355px] rounded-md shadow" on:submit|preventDefault use:form>
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex items-center justify-between pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{#if isEditing}
					Edit Category
				{:else}
					Add Category
				{/if}
			</h2>
			<button
				class="inline-flex rounded-md p-1.5 pl-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
				on:click={() => dispatch('close')}
				type="button"
			>
				<span class="sr-only">Dismiss</span>
				<Icon aria-hidden="true" class="h-5 w-5" src={XMark} />
			</button>
		</div>

		<Alert hasCloseButton={false} isVisible={!!getErrors($errors)} type="error">
			{getErrors($errors)}
		</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input autocomplete="off" class="flex-1" inputClass="" name="name" placeholder="Name" />

			<Select
				bind:value={$data.color}
				class="flex items-center"
				label="Category"
				labelClass="w-1/5"
				name="color"
				selectClass="flex-1"
			>
				<div class="flex items-center gap-5" slot="placeholder">
					<div class={classnames('h-5 w-5 rounded-md', tailwindColors[$data?.color]?.darkBg)} />
					{$data.color}
				</div>

				{#each Object.keys(tailwindColors) as color (color)}
					<SelectItem value={color}>
						<div class="flex items-center gap-5">
							<div class={classnames('h-5 w-5 rounded-md', tailwindColors[color]?.darkBg)} />
							{color}
						</div>
					</SelectItem>
				{/each}
			</Select>

			<Select
				bind:value={$data.type}
				class="flex items-center"
				label="Type"
				labelClass="w-1/5"
				name="type"
				selectClass="flex-1"
			>
				<div class="flex items-center gap-5" slot="placeholder">{$data.type}</div>

				{#each types as type (type)}
					<SelectItem class="flex items-center gap-5" value={type}>{type}</SelectItem>
				{/each}
			</Select>

			<div class="rounded-lg bg-white p-2">
				<Toggle bind:value={$data.isDefault} label="Is default" name="isDefault" />
			</div>
		</div>
	</div>

	<div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
		{#if isEditing}
			<ConfirmButton
				color="red"
				on:confirm={() => deleteCategory(category.id, userId, dispatch)}
				type="button"
			>
				Delete
			</ConfirmButton>
		{:else}
			<div />
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
