<script lang="ts">
	import { validator } from '@felte/validator-yup';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { types, tailwindColors } from '$lib/category/utils';
	import type { CCategory } from '$lib/category/utils';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Loading from '$lib/components/loading/Loading.svelte';
	import SelectItem from '$lib/components/select/select-item/SelectItem.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import Toggle from '$lib/components/toggle/Toggle.svelte';
	import { db } from '$lib/firebase';
	import classnames from 'classnames';
	import { ca } from 'date-fns/locale';
	import { createForm } from 'felte';
	import { addDoc, updateDoc, collection, doc, setDoc } from 'firebase/firestore';
	import { createEventDispatcher, onMount } from 'svelte';
	import { object, string } from 'yup';

	export let userId: string;

	export let category: CCategory = {
		name: '',
		isDefault: false,
		color: Object.keys(tailwindColors)[0],
		type: types[0],
	};

	$: isEditing = false;

	let loading = false;

	const dispatch = createEventDispatcher<{ close: null }>();

	const schema = object({
		name: string().required(),
	});

	const { form, data, errors } = createForm({
		extend: [validator({ schema })],
		validateSchema: schema,
		initialValues: category,
		onSubmit: async (values) => {
			const { id, ...data } = values;
			if (id) {
				const categoryDocRef = doc(db, 'users', userId, 'categories', id);
				void updateDoc(categoryDocRef, data);
			} else {
				const categoriesCollectionRef = collection(db, 'users', userId, 'categories');
				void addDoc(categoriesCollectionRef, data);
			}
			dispatch('close');
		},
	});

	$: parsedErrors = Object.values($errors)
		.filter((value) => value)
		.join(', ');
</script>

<form method="POST" use:form on:submit|preventDefault class="w-[355px] shadow rounded-md">
	<div class="bg-neutral-100 px-4 py-5 sm:p-4">
		<div class="flex justify-between items-center pb-2">
			<h2 class="text-lg font-medium text-gray-900">
				{#if isEditing}
					Edit Category
				{:else}
					Add Category
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
		<Alert type="error" isVisible={!!parsedErrors} hasCloseButton={false}>{parsedErrors}</Alert>

		<div class="flex flex-col gap-2 text-sm font-medium text-gray-700">
			<Input class="flex-1" inputClass="" placeholder="Name" autocomplete="off" name="name" />

			<Select
				name="color"
				bind:value={$data.color}
				label="Category"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<div slot="placeholder" class="flex gap-5 items-center">
					<div class={classnames('h-5 w-5 rounded-md', tailwindColors[$data?.color]?.darkBg)} />
					{$data.color}
				</div>

				{#each Object.keys(tailwindColors) as color (color)}
					<SelectItem value={color}>
						<div class="flex gap-5 items-center">
							<div class={classnames('h-5 w-5 rounded-md', tailwindColors[color]?.darkBg)} />
							{color}
						</div>
					</SelectItem>
				{/each}
			</Select>

			<Select
				name="type"
				bind:value={$data.type}
				label="Type"
				class="flex items-center"
				labelClass="w-1/5"
				selectClass="flex-1"
			>
				<div slot="placeholder" class="flex gap-5 items-center">{$data.type}</div>

				{#each types as type (type)}
					<SelectItem value={type} class="flex gap-5 items-center">{type}</SelectItem>
				{/each}
			</Select>

			<div class="bg-white rounded-lg p-2">
				<Toggle label="Is default" name="isDefault" bind:value={$data.isDefault} />
			</div>
		</div>
	</div>

	<div class="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
		{#if isEditing}
			<Button disabled={loading} color="red">Delete</Button>
		{:else}
			<div />
		{/if}

		<Button disabled={loading} type="submit">
			{#if isEditing} Edit {:else} Add {/if}
		</Button>
	</div>

	<Loading {loading} class="h-8 w-8 text-indigo-500" />
</form>
