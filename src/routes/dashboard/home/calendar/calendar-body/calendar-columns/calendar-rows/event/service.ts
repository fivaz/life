import { removeDraggedEvent, setDraggedEvent } from '$lib/dragged/store';
import { db } from '$lib/firebase';
import type { Event } from '$lib/task/utils';
import { getDuration } from '$lib/task/utils';
import { doc, updateDoc } from 'firebase/firestore';

export function isShort(event: Event) {
	return Math.abs(getDuration(event)) <= 15;
}

export function toggleCompletion(userId: string, event: Event, targetDate: Date) {
	const taskDocRef = doc(db, 'users', userId, 'tasks', event.id);
	return updateDoc(taskDocRef, {
		isDone: !event.isDone,
	});
}

export function dragStart(e: DragEvent, event: Event) {
	if (e.currentTarget instanceof HTMLDivElement) {
		e.currentTarget.style.opacity = '0.5';
		setDraggedEvent(event);
	}
}

export function dragEnd(e: DragEvent) {
	if (e.currentTarget instanceof HTMLDivElement) {
		e.currentTarget.style.opacity = '';
		removeDraggedEvent();
	}
}
