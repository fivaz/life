import { db } from '$lib/firebase';
import { Query, collection, query, where } from 'firebase/firestore';

export type Goal = {
	deadline: string;
	id: string;
	isDone: boolean;
	name: string;
};

export function queryUncompletedGoals(userId: string) {
	const goalsRef = collection(db, `users/${userId}/goals`);
	return query(goalsRef, where('isDone', '==', false)) as Query<Goal>;
}
