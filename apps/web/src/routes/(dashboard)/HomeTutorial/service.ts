import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { DB_PATH, demoLogin } from '$lib/consts';
import { currentUser } from '$lib/user/user.utils.svelte';
import { db } from '$lib/firebase';
import { addDays, isSameWeek, startOfWeek } from 'date-fns';
import { formatDate, parseDate } from '@life/shared/date';

export const resetData = async () => {
	const tasksRef = collection(db, DB_PATH.USERS, demoLogin.uid, DB_PATH.TASKS);
	const snapshot = await getDocs(tasksRef);

	const batch = writeBatch(db);
	const now = new Date();
	const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });

	snapshot.forEach((docSnap) => {
		const task = docSnap.data();

		const taskDate = parseDate(task.date);
		if (!taskDate) return;

		// Skip if the date is already in the current week
		if (isSameWeek(taskDate, now, { weekStartsOn: 1 })) return;

		const weekDay = taskDate.getDay(); // 0–6

		const adjustedWeekDay = weekDay === 0 ? 6 : weekDay - 1;

		const newDate = addDays(startOfThisWeek, adjustedWeekDay);

		batch.update(doc(db, DB_PATH.USERS, currentUser.uid, DB_PATH.TASKS, docSnap.id), {
			date: formatDate(newDate),
		});
	});

	await batch.commit();
};
