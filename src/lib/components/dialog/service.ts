import { writable } from 'svelte/store';

const closedModal = {
	cancelText: '',
	confirmText: '',
	message: '',
	resolve: () => {},
	show: false,
	title: '',
};

export const modal = writable<{
	cancelText: string;
	confirmText: string;
	message: string;
	resolve: (value: boolean | null) => void;
	show: boolean;
	title: string;
}>(closedModal);

export function createModal({
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
		modal.update(() => ({
			cancelText,
			confirmText,
			message,
			resolve,
			show: true,
			title,
		}));
	});
}

export function closeModal() {
	modal.update(() => closedModal);
}
