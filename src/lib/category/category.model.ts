export const CategoryTypes = {
	FUN: 'fun',
	SLEEP: 'sleep',
	WORK: 'work',
};

export type CategoryType = (typeof CategoryTypes)[keyof typeof CategoryTypes];

export type Category = {
	color: string;
	id: string;
	isDefault: boolean;
	name: string;
	type: CategoryType;
};
