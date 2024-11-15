export type Routine = {
	completeHistory: { date: string; isCompleted: boolean }[];
	// date in ISO format
	createdAt: string;
	icon: string;
	id: string;
	name: string;
	order: number;
};
