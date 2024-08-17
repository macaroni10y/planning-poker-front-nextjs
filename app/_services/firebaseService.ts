import { type Vote2, vote2Converter } from "@/app/_models/Vote2";
import { db } from "@/utils/firebase/config";
import type { DocumentData } from "@firebase/firestore";
import {
	type Unsubscribe,
	addDoc,
	collection,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import {getDocs} from "@firebase/firestore";

const collectionName = "votes";

const collectionRef = collection(db, collectionName).withConverter(
	vote2Converter,
);

export const addVote = async (vote: Vote2) => {
	await addDoc<Vote2, DocumentData>(collectionRef, vote);
};

export const subscribeToRoomVotes = (
	roomId: string,
	callback: (votes: Vote2[]) => void,
): Unsubscribe => {
	const q = query<Vote2, DocumentData>(
		collectionRef,
		where("roomId", "==", roomId),
	);
	return onSnapshot(q, (querySnapshot) => {
		const votes: Vote2[] = querySnapshot.docs.map((doc) => doc.data());
		callback(votes);
	});
};

export const revealVotes = async () => {
	const snapshot = await getDocs(collectionRef);
	snapshot.docs.map(doc => doc.data())
		.forEach(vote => {
			// TODO implement
		});
}
