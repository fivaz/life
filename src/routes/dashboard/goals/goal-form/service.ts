import { applyAction } from '$app/forms';
import { createModal } from '$lib/components/dialog/service';
import { DATE, UnknownError } from '$lib/consts';
import { closeModal } from '$lib/form-modal/store';
import { removeGoal, updateGoal } from '$lib/goal/store';
import type { SubSubmitFunction } from '$lib/types-utils';
import { parse } from 'date-fns';
import type { ActionData } from '../$types';
import type { GoalIn } from '../service';

export const handleDelete: SubSubmitFunction<GoalIn, ActionData> = async ({ form }) => {
	const result = await createModal({ title: 'Are you sure?' });

	if (!result) {
		return () => {};
	}

	return async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success' && form?.removed) {
			removeGoal(form.removed);
		} else {
			console.log(form?.error || UnknownError);
		}
		closeModal();
	};
};
function buildDeadline(formData: FormData) {
	// This need to be done in the client to avoid persisting a date from a different
	// timezone if the server is in a different timezone
	const date = formData.get('deadline') as string;

	const dateISO = parse(date, DATE, new Date());

	formData.set('deadline', dateISO.toISOString());
}
export const handleSave: SubSubmitFunction<GoalIn, ActionData> = async ({ formData, form }) => {
	buildDeadline(formData);

	return async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success' && form?.saved) {
			updateGoal(form.saved);
		} else {
			console.log(form?.error || UnknownError);
		}
		closeModal();
	};
};
