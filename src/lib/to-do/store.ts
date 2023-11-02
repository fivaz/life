import type { EEvent } from '$lib/event/utils';
import { writable } from 'svelte/store';

export const toDos = writable<EEvent[]>([]);

export function updateToDo(newToDo: EEvent) {
	toDos.update(($toDos) => {
		const index = $toDos.findIndex((toDo) => toDo.id === newToDo.id);
		if (index !== -1) {
			return $toDos.map((toDo) => (toDo.id === newToDo.id ? newToDo : toDo));
		} else {
			return [...$toDos, newToDo];
		}
	});
}

export function removeToDo(toDo: EEvent) {
	toDos.update(($toDos) => $toDos.filter((existingToDo) => existingToDo.id !== toDo.id));
}
