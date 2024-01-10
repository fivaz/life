import { writable } from 'svelte/store';

const closedModal = {
	show: false,
	title: '',
	message: '',
	confirmText: '',
	cancelText: '',
	resolve: () => {},
};

export const modal = writable<{
	show: boolean;
	title: string;
	message: string;
	confirmText: string;
	cancelText: string;
	resolve: (value: boolean | null) => void;
}>(closedModal);

export function createModal({
	title,
	message = '',
	confirmText = 'confirm',
	cancelText = 'cancel',
}: {
	title: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
}) {
	return new Promise<boolean | null>((resolve) => {
		modal.update(($modal) => ({
			show: true,
			title,
			message,
			confirmText,
			cancelText,
			resolve,
		}));
	});
}

export function closeModal() {
	modal.update(($modal) => closedModal);
}
