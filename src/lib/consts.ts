export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

// when the week starts in the app, 1 is for Monday
export const weekStartsOn = 1;

export const Routes = {
	ROOT: '/',
	CATEGORIES: `/categories`,
	GOALS: `/goals`,
	PROFILE: `/profile`,
	REGISTER: '/register',
	REPORT: `/report`,
	ROUTINE: `/routine`,
	LOGIN: '/login',
	TASKS: `/tasks`,
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
