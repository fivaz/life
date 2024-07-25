export const DATE = 'yyyy-MM-dd';
export const TIME = 'HH:mm';

export const DATE_FR = 'dd.MM.yyyy';
export const DATE_FR_SHORT = 'dd.MM';
export const DATETIME = 'yyyy-MM-dd HH:mm';

export const loginRoute = '/login';
export const registerRoute = '/register';

export const rootRoute = '/';
export const dashboardRoute = '/dashboard';

export const profileRoute = `${dashboardRoute}/profile`;
export const homeRoute = `${dashboardRoute}/home`;
export const categoriesRoute = `${dashboardRoute}/categories`;
export const tasksRoute = `${dashboardRoute}/tasks`;
export const goalsRoute = `${dashboardRoute}/goals`;
export const reportRoute = `${dashboardRoute}/report`;

export const demoLogin = {
	email: 'demo@demo.com',
	password: '123456',
};

export const routes = [
	rootRoute,
	loginRoute,
	registerRoute,
	homeRoute,
	categoriesRoute,
	tasksRoute,
	goalsRoute,
	profileRoute,
];
