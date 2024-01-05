<script lang="ts">
	import { ArrowUturnUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/button/Button.svelte';
	import { updateEvent } from '$lib/event/store';
	import type { EEvent } from '$lib/event/utils';
	import type { ActionData } from '../../../../../../.svelte-kit/types/src/routes/dashboard/to-do/$types';

	export let toDo: EEvent;

	export let form: ActionData | null;
	const submit: SubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);
			if (result.type === 'success') {
				if (form?.saved) {
					updateEvent(form.saved);
				}
			}
		};
	};
</script>

<form method="POST" action="?/rescheduleToTomorrow" use:enhance={submit}>
	<input type="hidden" name="id" value={toDo.id} />
	<input type="hidden" name="startDate" value={toDo.startDate} />
	<input type="hidden" name="duration" value={toDo.duration} />
	<Button type="submit">
		<Icon src={ArrowUturnUp} class="h-4 w-4" />
	</Button>
</form>
