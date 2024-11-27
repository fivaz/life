const closedDialog: Dialog = {
	cancelText: '',
	confirmText: '',
	message: '',
	resolve: () => {},
	show: false,
	title: ''
};

type Dialog = {
	cancelText: string;
	confirmText: string;
	message: string;
	resolve: (value: boolean | null) => void;
	show: boolean;
	title: string;
};

export const dialog = $state<{ value: Dialog }>({ value: closedDialog });

export function createDialog({
	cancelText = 'cancel',
	confirmText = 'confirm',
	message = '',
	title
}: {
	cancelText?: string;
	confirmText?: string;
	message?: string;
	title: string;
}) {
	return new Promise<boolean | null>((resolve) => {
		dialog.value = {
			cancelText,
			confirmText,
			message,
			resolve,
			show: true,
			title
		};
	});
}

export function closeDialog() {
	dialog.value = closedDialog;
}
