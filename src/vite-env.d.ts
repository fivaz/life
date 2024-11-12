/// <reference types="vite/client" />

import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';
import 'vite-plugin-pwa/pwa-assets';
import '@storybook/addon-svelte-csf';

import type { Task } from '$lib/task/utils';

interface ImportMetaEnv {
	readonly PUBLIC_FIREBASE_API_KEY: string;
	readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
	readonly PUBLIC_FIREBASE_PROJECT_ID: string;
	readonly PUBLIC_FIREBASE_APP_ID: string;
	readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
	readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
	readonly PUBLIC_COMMIT_HASH: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

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
		event: Task,
		moveObject: {
			date: string;
			duration: string;
			oldDate: string;
			startTime: string;
		},
	) => void;
	persistTasks: (tasks: Task[]) => void;
	toggleEvent: (event: Task, targetDate: string) => void;
};

declare module 'svelte' {
	export function getContext<T>(key: T extends keyof Context ? T : never): Context[T];

	export function setContext<T>(
		key: T extends keyof Context ? T : never,
		context: Context[T],
	): void;
}
