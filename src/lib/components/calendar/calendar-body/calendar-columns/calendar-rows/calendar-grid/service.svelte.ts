// this var is used in a style tag ass grid-class, if you change the value, remember to also change the style tag
export const GRID_CLASS = 'grid-class';
export const GRID_CELL_TIME = 15;

// 24 - hours
// 60 - minutes
export const NUMBER_OF_CELLS = (24 * 60) / GRID_CELL_TIME;

export const GRID_CELL_HEIGHT = 50;
export const SUMMARY_GRID_CELL_HEIGHT = 30;

let _isSomethingDragging = $state<boolean>(false);

export const isSomethingDragging = {
	get value() {
		return _isSomethingDragging;
	},
	set value(newValue) {
		_isSomethingDragging = newValue;
	},
};
