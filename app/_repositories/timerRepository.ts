import {
	type OperationType,
	type Timer,
	timerConverter,
} from "@/app/_models/Timer";
import { db } from "@/utils/firebase/config";
import { getDocs, updateDoc } from "@firebase/firestore";
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";

const collectionName = "timers";

const collectionRef = collection(db, collectionName).withConverter(
	timerConverter,
);

export const addTimer = async (timer: Timer) => {
	await addDoc(collectionRef, timer);
};

export const updateTimer = async (
	operationType: OperationType,
	roomId: string,
	time: number,
) => {
	const q = query(collectionRef, where("roomId", "==", roomId));
	const querySnapshot = await getDocs(q);
	for (const doc of querySnapshot.docs) {
		await updateDoc(doc.ref, {
			operationType,
			time,
		});
	}
};

export const subscribeToRoomTimer = (
	roomId: string,
	callback: (timer: Timer) => void,
) => {
	const q = query(collectionRef, where("roomId", "==", roomId));
	return onSnapshot(q, (querySnapshot) => {
		const timer = querySnapshot.docs.map((doc) => doc.data())[0];
		callback(timer);
	});
};
