export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

export const dashboardRoute = '/dashboard';

export const Routes = {
	CATEGORIES: `${dashboardRoute}/categories`,
	GOALS: `${dashboardRoute}/goals`,
	HOME: `${dashboardRoute}/home`,
	LOGIN: '/login',
	PROFILE: `${dashboardRoute}/profile`,
	REGISTER: '/register',
	REPORT: `${dashboardRoute}/report`,
	ROOT: '/',
	TASKS: `${dashboardRoute}/tasks`,
};

// firebase paths
export const DbPaTH = {
	AVATARS: 'avatars',
	CATEGORIES: 'categories',
	GOALS: 'goals',
	TASKS: 'tasks',
	USERS: 'users',
};

export const demoLogin = {
	email: 'demo@demo.com',
	password: '123456',
};
