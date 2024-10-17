export type Routine = {
	completeHistory: { date: string; isCompleted: boolean }[];
	createdAt: string;
	icon: string;
	id: string;
	name: string;
	order: number;
};
