import { writable } from 'svelte/store';

const closedDialog = {
	cancelText: '',
	confirmText: '',
	message: '',
	resolve: () => {},
	show: false,
	title: '',
};

export const dialog = writable<{
	cancelText: string;
	confirmText: string;
	message: string;
	resolve: (value: boolean | null) => void;
	show: boolean;
	title: string;
}>(closedDialog);

export function createDialog({
	cancelText = 'cancel',
	confirmText = 'confirm',
	message = '',
	title,
}: {
	cancelText?: string;
	confirmText?: string;
	message?: string;
	title: string;
}) {
	return new Promise<boolean | null>((resolve) => {
		dialog.update(() => ({
			cancelText,
			confirmText,
			message,
			resolve,
			show: true,
			title,
		}));
	});
}

export function closeDialog() {
	dialog.update(() => closedDialog);
}
