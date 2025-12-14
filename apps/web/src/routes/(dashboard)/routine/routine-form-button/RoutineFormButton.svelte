<script lang="ts">
	import { Button, ModalForm } from '@life/shared';
	import { Plus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	import type { Routine } from '$lib/routine/routine.model';
	import { buildEmptyRoutine } from '$lib/routine/routine.model';
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

	let isOpen = $state(false);
	let errorMessage = $state('');

	let routineIn = $state<Routine>(buildEmptyRoutine());

	function open() {
		routineIn = { ...routine };
		isOpen = true;
	}

	function close() {
		isOpen = false;
		errorMessage = '';
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (routine.id) {
			editRoutine(routineIn, currentUser.uid);
		} else {
			addRoutine(routineIn, currentUser.uid);
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
	<RoutineForm bind:routineIn />
</ModalForm>
