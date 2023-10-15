// place files you want to import through the `$lib` alias in this folder.
export type TEvent = {
	id: number;
	name: string;
	description: string | null;
	startDate: Date;
	endDate: Date;
	isDone: boolean;
};
