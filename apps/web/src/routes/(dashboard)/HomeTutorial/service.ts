import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import type { Options } from "intro.js/src/option";
import { DB_PATH } from '$lib/consts';
import { currentUser } from '$lib/user/user.utils.svelte';
import { db } from '$lib/firebase';
import { addDays, isSameWeek, setHours, setMinutes, setSeconds, startOfWeek } from 'date-fns';
import { formatDate, parseDate } from '@life/shared/date';

export const getSteps = (createEventButton: HTMLElement) : Partial<Options> => ({
	steps: [
		// {
		// 	intro: `
		//     <div style="text-align:center">
		//       <h2>Bienvenue sur Life</h2>
		//       <p>Votre compagnon pour planifier, accomplir et progresser.</p>
		//       <p style="margin-top:10px">👉 <strong>Voir comment ça marche</strong></p>
		//     </div>`
		// },
		// {
		// 	element: document.querySelector("a[href='/']") as HTMLElement,
		// 	intro: 'Vous êtes dans l’onglet <strong>Calendrier</strong>',
		// 	position: 'bottom'
		// },
		// {
		// 	element: createEventButton,
		// 	intro: `Prêt à planifier ? Cliquez ici pour ajouter un événement.`,
		// 	position: 'left',
		// 	disableInteraction: false,
		// 	tooltipClass: 'hide-buttons'
		// },
		{
			intro: `test`
		},
	],
	showBullets: false,
	showProgress: true,
	exitOnOverlayClick: false,
	nextLabel: 'Suivant',
	prevLabel: 'Précédent'
})


export const resetData = async () => {
	const tasksRef = collection(db, DB_PATH.USERS, currentUser.uid, DB_PATH.TASKS);
	const snapshot = await getDocs(tasksRef);

	const batch = writeBatch(db);
	const now = new Date();
	const startOfThisWeek = startOfWeek(now, {weekStartsOn: 1});

	snapshot.forEach((docSnap) => {
		const task = docSnap.data();


		const taskDate = parseDate(task.date);
		if (!taskDate) return;

		// Skip if the date is already in the current week
		if (isSameWeek(taskDate, now, {weekStartsOn: 1})) return;

		const weekDay = taskDate.getDay(); // 0–6


		let newDate = addDays(startOfThisWeek, weekDay-1);

		batch.update(doc(db, DB_PATH.USERS, currentUser.uid, DB_PATH.TASKS, docSnap.id), {
			date: formatDate(newDate),
		});
	});

	await batch.commit();
}