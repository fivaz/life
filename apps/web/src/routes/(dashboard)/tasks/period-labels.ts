import type { TaskListType } from './service';

export const taskListLabels: Record<TaskListType, string> = {
	overdue: 'Overdue',
	today: 'Today',
	tomorrow: 'Tomorrow',
	thisWeek: 'This week',
	nextWeek: 'Next week',
	someday: 'Someday',
	recurringDaily: 'Recurring Daily',
	recurringWeekly: 'Recurring Weekly',
	recurringMonthly: 'Recurring Monthly',
	recurringYearly: 'Recurring Yearly',
};

export function getPeriodLabel(period: string): string {
	return taskListLabels[period as TaskListType] || period;
}
