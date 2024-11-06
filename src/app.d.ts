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

import type { AnyTimedTask, Task, UnTimedTask } from '$lib/task/utils';

import '@storybook/addon-svelte-csf';

declare module '@storybook/addon-svelte-csf' {
	interface StoryProps {
		args: Record<string, unknown>;
	}
}

export type Context = {
	changeWeek: (weekStart: Date) => void;
	createTask: (date: Date) => void;
	editTask: (task: Task, date: string) => void;
	moveEvent: (
		event: AnyTimedTask,
		moveObject: {
			date: string;
			duration: string;
			oldDate: string;
			startTime: string;
		},
	) => void;
	persistToDos: (toDos: UnTimedTask[]) => void;
	toggleEvent: (event: AnyTimedTask, targetDate: string) => void;
};

declare module 'svelte' {
	export function getContext<T>(key: T extends keyof Context ? T : never): Context[T];

	export function setContext<T>(
		key: T extends keyof Context ? T : never,
		context: Context[T],
	): void;
}
