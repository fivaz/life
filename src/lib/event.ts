export type EEvent = {
	id: number;
	name: string;
	description: string | null;
	startDate: Date;
	endDate: Date;
	isDone: boolean;
};

export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const loginRoute = '/';
export const dashboardRoute = '/dashboard';
