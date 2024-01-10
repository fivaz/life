import { writable } from 'svelte/store';

const closedModal = {
	show: false,
	title: '',
	message: '',
	confirmText: '',
	cancelText: '',
	resolve: () => {},
	reject: () => {},
};

export const modal = writable<{
	show: boolean;
	title: string;
	message: string;
	confirmText: string;
	cancelText: string;
	resolve: (value: boolean | null) => void;
	reject: (value: boolean | null) => void;
}>(closedModal);

export function createModal(
	title: string,
	message = '',
	confirmText = 'confirm',
	cancelText = 'cancel',
) {
	return new Promise<boolean | null>((resolve, reject) => {
		modal.update(($modal) => ({
			show: true,
			title,
			message,
			confirmText,
			cancelText,
			resolve,
			reject,
		}));
	});
}

export function closeModal() {
	modal.update(($modal) => closedModal);
}
