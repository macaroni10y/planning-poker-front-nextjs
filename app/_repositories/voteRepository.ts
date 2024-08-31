import { type Vote2, vote2Converter } from "@/app/_models/Vote2";
import { db } from "@/utils/firebase/config";
import { type DocumentData, getDocs, updateDoc } from "@firebase/firestore";
import {
	type Unsubscribe,
	addDoc,
	collection,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";

const collectionName = "votes";

const collectionRef = collection(db, collectionName).withConverter(
	vote2Converter,
);

const addVote = async (vote: Vote2) => {
	await addDoc<Vote2, DocumentData>(collectionRef, vote);
};

export const joinRoom = async (
	roomId: string,
	userId: string,
	userName: string,
) => {
	await addVote({
		id: "",
		roomId,
		userId,
		userName,
		value: "not yet",
	});
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

export const revealVotes = async (roomId: string) => {
	const q = query(
		collectionRef,
		where("roomId", "==", roomId),
		where("value", "==", "not yet"),
	);
	const snapshot = await getDocs(q);
	for (const doc of snapshot.docs) {
		await updateDoc(doc.ref, {
			value: "skip",
		});
	}
};

export const submitVote = async (
	roomId: string,
	userId: string,
	value: string,
) => {
	const q = query(
		collectionRef,
		where("roomId", "==", roomId),
		where("userId", "==", userId),
	);
	const snapshot = await getDocs(q);
	for (const doc of snapshot.docs) {
		await updateDoc(doc.ref, {
			value,
		});
	}
};

export const resetVotes = async (roomId: string) => {
	const snapshot = await getDocs(
		query(collectionRef, where("roomId", "==", roomId)),
	);
	for (const doc of snapshot.docs) {
		await updateDoc(doc.ref, {
			value: "not yet",
		});
	}
};
