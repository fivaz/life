import type { TToDo } from '$lib/to-do/utils';
import { writable } from 'svelte/store';

export const toDos = writable<TToDo[]>([]);

export function updateToDo(newToDo: TToDo) {
	toDos.update(($toDos) => {
		const index = $toDos.findIndex((toDo) => toDo.id === newToDo.id);
		if (index !== -1) {
			return $toDos.map((toDo) => (toDo.id === newToDo.id ? newToDo : toDo));
		} else {
			return [...$toDos, newToDo];
		}
	});
}

export function removeToDo(toDo: TToDo) {
	toDos.update(($toDos) => $toDos.filter((existingToDo) => existingToDo.id !== toDo.id));
}
