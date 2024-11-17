import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';
import 'vite-plugin-pwa/pwa-assets';

import type { HHmm, Task, yyyyMMdd } from '$lib/task/task.model';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

export type Context = {
	changeWeek: (weekStart: Date) => void;
	createTask: (date: Date) => void;
	editTask: (task: Task, date: yyyyMMdd) => void;
	moveEvent: (
		event: Task,
		moveObject: {
			date: yyyyMMdd;
			duration: HHmm;
			oldDate: yyyyMMdd;
			startTime: HHmm;
		},
	) => void;
	persistTasks: (tasks: Task[]) => void;
	toggleEvent: (event: Task, targetDate: yyyyMMdd) => void;
};

declare module 'svelte' {
	export function getContext<T>(key: T extends keyof Context ? T : never): Context[T];

	export function setContext<T>(
		key: T extends keyof Context ? T : never,
		context: Context[T],
	): void;
}

import type { ComponentProps } from 'svelte';

declare module '@storybook/addon-svelte-csf' {
	export type Args = ComponentProps;
}
