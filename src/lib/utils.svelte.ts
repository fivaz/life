let _title = $state('Dashboard');

export const title = {
	get value() {
		return _title;
	},
	set value(value) {
		_title = value;
	},
};
