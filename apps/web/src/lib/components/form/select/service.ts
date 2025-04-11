import { getContext, setContext } from 'svelte';

export const SELECT_CONTEXT = Symbol('select-context');

export function deepEqual(a: unknown, b: unknown): boolean {
	// More efficient than JSON.stringify for simple values
	if (a === b) return true;
	return JSON.stringify(a) === JSON.stringify(b);
}

interface SelectContext {
	selectedValue: unknown;
	isSelected: (value: unknown) => boolean;
}

export function setSelectValue(value: unknown): void {
	setContext(SELECT_CONTEXT, {
		selectedValue: value,
		isSelected: (itemValue: unknown) => deepEqual(itemValue, value),
	});
}

export function getSelectValue() {
	return getContext<SelectContext>(SELECT_CONTEXT);
}
