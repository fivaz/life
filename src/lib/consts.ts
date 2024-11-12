export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

const dashboard = '';

export const Routes = {
	ROOT: `${dashboard}/`,
	CATEGORIES: `${dashboard}/categories`,
	GOALS: `${dashboard}/goals`,
	PROFILE: `${dashboard}/profile`,
	REPORT: `${dashboard}/report`,
	ROUTINE: `${dashboard}/routine`,
	TASKS: `${dashboard}/tasks`,
	REGISTER: `/register`,
	LOGIN: `/login`,
};

// firebase paths
export const DB_PATH = {
	AVATARS: 'avatars',
	CATEGORIES: 'categories',
	GOALS: 'goals',
	ROUTINES: 'routines',
	TASKS: 'tasks',
	USERS: 'users',
};

export const demoLogin = {
	email: 'demo@demo.com',
	password: '123456',
};
