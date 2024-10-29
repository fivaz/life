
const closedDialog = {
	cancelText: '',
	confirmText: '',
	message: '',
	resolve: () => {},
	show: false,
	title: '',
};

let _dialog = $state<{
	cancelText: string;
	confirmText: string;
	message: string;
	resolve: (value: boolean | null) => void;
	show: boolean;
	title: string;
}>(closedDialog);

export const dialog = {
	get value() {
		return _dialog;
	},
	set value(value) {
		_dialog = value;
	},
};

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
		_dialog = {
			cancelText,
			confirmText,
			message,
			resolve,
			show: true,
			title,
		};
	});
}

export function closeDialog() {
	_dialog = closedDialog;
}
