export type TEvent = {
	id: number;
	name: string;
	description: string | null;
	startDate: Date;
	endDate: Date;
	isDone: boolean;
};
