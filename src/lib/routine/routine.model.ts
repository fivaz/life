export type Routine = {
	completeHistory: { date: string; isCompleted: boolean }[];
	// date in ISO format
	createdAt: string;
	icon: string;
	id: string;
	name: string;
	order: number;
};

export function buildEmptyRoutine(): Routine {
	return {
		completeHistory: [],
		createdAt: new Date().toISOString(),
		icon: 'Fire',
		id: '',
		name: '',
		order: 0,
	};
}
