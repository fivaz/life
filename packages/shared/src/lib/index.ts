// Reexport your entry components here
import Button from './form/button/Button.svelte';
import Dialog from './dialog/Dialog.svelte';

export { Button, Dialog };

export function add(a: number, b: number) {
	return a + b;
}
