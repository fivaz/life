// place files you want to import through the `$lib` alias in this folder.
export type TEvent = {
	name: string;
	description: string | null;
	startDate: Date;
	endDate: Date;
	isDone: boolean;
};
