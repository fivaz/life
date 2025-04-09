<script lang="ts">
	import { Button, IconSelector, LInput, ModalForm } from '@life/shared';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import Select from '$lib/components/form/select/Select.svelte';
	import SelectItem from '$lib/components/form/select/select-item/SelectItem.svelte';
	import Toggle from '$lib/components/form/toggle/Toggle.svelte';
	import type { Routine } from '$lib/routine/routine.model';
	import { periods, routineTimeMap } from '$lib/routine/routine.model';
	import { addRoutine, deleteRoutine, editRoutine } from '$lib/routine/routine.repository';
	import { currentUser } from '$lib/user/user.utils.svelte';

	import RoutineForm from './routine-form/RoutineForm.svelte';

	interface Props {
		routine: Routine;
		children?: Snippet;
		color?: 'indigo' | 'red' | 'white' | 'none';
		class?: string;
		padding?: string;
	}

	let { routine, children, color, class: klass, padding }: Props = $props();

	let routineIn = $state({ ...routine });

	let isOpen = $state(false);

	let errorMessage = $state('');

	function open() {
		routineIn = { ...routine };
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (routine.id) {
			editRoutine(routine, currentUser.uid);
		} else {
			addRoutine(routine, currentUser.uid);
		}
		close();
	}
</script>

<Button class={klass} {color} onclick={open} {padding}>
	{#if children}
		{@render children()}
	{:else}
		<Plus class="size-4" />
		New Routine
	{/if}
</Button>

<ModalForm
	name="Routine"
	{close}
	{errorMessage}
	isEditing={!!routine.id}
	onDelete={() => deleteRoutine(routine.id, currentUser.uid, close)}
	{onSubmit}
	bind:isOpen
>
	<RoutineForm routine={routineIn} />
</ModalForm>
