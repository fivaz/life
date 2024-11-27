// Reexport your entry components here
import Test from './Test.svelte';

export { Test };

export function add(a: number, b: number) {
	return a + b;
}
