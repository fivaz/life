import { applyAction } from '$app/forms';
import { createModal } from '$lib/components/dialog/service';
import { DATE, DATETIME, TIME, UnknownError } from '$lib/consts';
import { closeModal } from '$lib/form-modal/store';
import { removeTask, updateTasks } from '$lib/task/store';
import type { OnlyTTask } from '$lib/task/utils';
import type { SubSubmitFunction } from '$lib/types-utils';
import { add, differenceInMinutes, format, isAfter, isValid, parse } from 'date-fns';

export type TaskIn = Omit<
	OnlyTTask,
	'startDate' | 'endDate' | 'duration' | 'deadline' | 'recurringStartAt' | 'recurringEndAt'
> & {
	date: string;
	startTime: string;
	endTime: string;
	duration: string;
	deadline: string;
	isRecurring: boolean;
	wasRecurring: boolean;
	recurringStartAt: string;
	recurringEndAt: string;
	isEvent: boolean;
};

export function getEndTime(startTime: string, duration: string): string {
	if (!startTime || !duration) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [DurationHours, durationMinutes] = duration.split(':').map(Number);

	const startTimeDate = new Date(1, 0, 0, startTimeHours, startTimeMinutes);

	const totalDate = add(startTimeDate, { hours: DurationHours, minutes: durationMinutes });
	return format(totalDate, TIME);
}

export function getDuration(startTime: string, endTime: string): string {
	if (!startTime || !endTime) {
		return '';
	}
	const [startTimeHours, startTimeMinutes] = startTime.split(':').map(Number);
	const [endTimeHours, endTimeMinutes] = endTime.split(':').map(Number);

	const startTimeDate = new Date(0, 0, 0, startTimeHours, startTimeMinutes);
	const endTimeDate = new Date(0, 0, 0, endTimeHours, endTimeMinutes);

	const totalMinutes = differenceInMinutes(endTimeDate, startTimeDate);
	const totalHours = Math.floor(totalMinutes / 60);
	const remainingMinutes = totalMinutes % 60;

	return format(new Date(0, 0, 0, totalHours, remainingMinutes), TIME);
}

export function formatDates(task: TaskIn, formData: FormData) {
	if (task.isEvent) {
		buildEventDates(formData);
	} else {
		buildDeadline(formData);
	}
}

function buildEventDates(formData: FormData): void {
	const date = formData.get('date') as string;
	const startTime = formData.get('startTime') as string;
	const endTime = formData.get('endTime') as string;
	const isRecurring = !!formData.get('isRecurring');

	const startDateString = `${date} ${startTime}`;
	const endDateString = `${date} ${endTime}`;

	// Parse the date and time string
	const startDate = parse(startDateString, DATETIME, new Date());
	const endDate = parse(endDateString, DATETIME, new Date());

	if (!isValid(startDate) || !isValid(endDate)) {
		throw Error('date, startTime and endTime should be valid date and time');
	}

	formData.set('startDate', startDate.toISOString());
	formData.set('endDate', endDate.toISOString());

	if (isRecurring) {
		const recurringStartAtString = formData.get('recurringStartAt') as string;
		const recurringEndAtString = formData.get('recurringEndAt') as string;
		const recurringStartAt = parse(recurringStartAtString, DATE, new Date());
		const recurringEndAt = parse(recurringEndAtString, DATE, new Date());

		if (!isValid(recurringStartAt) || !isValid(recurringEndAt)) {
			throw Error('date, recurringStartAt and recurringEndAt should be valid date and time');
		}

		formData.set('recurringStartAt', recurringStartAt.toISOString());
		formData.set('recurringEndAt', recurringEndAt.toISOString());
	}
}

function buildDeadline(formData: FormData) {
	const deadlineString = formData.get('deadline') as string;

	const deadline = deadlineString ? parse(deadlineString, DATE, new Date()).toISOString() : '';

	formData.set('deadline', deadline);
}

export function isEventsDateInverted(task: TaskIn) {
	return (
		task.isEvent &&
		!isAfter(parse(task.endTime, TIME, new Date()), parse(task.startTime, TIME, new Date()))
	);
}

export const handleDelete: SubSubmitFunction<TaskIn> = async () => {
	const result = await createModal({ title: 'Are you sure?' });

	if (!result) {
		return () => {};
	}
	closeModal();

	return async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success' && result.data?.removed) {
			removeTask(result.data.removed);
		} else if (result.type === 'error') {
			console.log(result.error || UnknownError);
		}
	};
};

export const handleCreate: SubSubmitFunction<TaskIn> = ({ formData, data: task }) => {
	formatDates(task, formData);

	closeModal();

	return async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success' && result.data?.created) {
			updateTasks(result.data.created);
		} else if (result.type === 'error') {
			console.log(result.error || UnknownError);
		}
	};
};

export const handleEdit: SubSubmitFunction<TaskIn> = async ({ formData, data: task }) => {
	formatDates(task, formData);

	if (task.isEvent) {
		if (task.wasRecurring && task.isRecurring) {
			const result = await createModal({
				title: 'This is a repeating event',
				message: 'Do you want to save the changes for ?',
				confirmText: 'this event only',
				cancelText: 'future events',
			});

			if (result === null) {
				return () => {};
			}

			formData.set('isForThisEventOnly', result ? 'true' : '');
		}
	}
	closeModal();

	return async ({ result }) => {
		await applyAction(result);
		if (result.type === 'success' && result.data?.updated) {
			updateTasks(result.data.updated);
		} else if (result.type === 'error') {
			console.log(result.error || UnknownError);
		}
	};
};
