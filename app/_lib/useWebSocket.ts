import {Participant, isVote, Vote} from "@/app/_types/types";
import { useEffect, useRef, useState } from "react";

interface UseWebSocket {
	participants: Participant[];
	joinRoom: (roomId: string, userName: string) => void;
	submitCard: (roomId: string, selectedCardNumber: Vote) => void;
	resetRoom: (roomId: string) => void;
	revealAllCards: (roomId: string) => void;
}

interface Props {
	url: string;
	roomId: string;
	userName: string;
	/**
	 * a function invoked when "shouldReset" property in a websocket message is true
	 */
	onReset: () => void;
}

const useWebSocket = ({
	url,
	roomId,
	userName,
	onReset,
}: Props): UseWebSocket => {
	const socket = useRef<WebSocket | null>(null);
	const [participants, setParticipants] = useState<Participant[]>([]);

	useEffect(() => {
		if (socket.current !== null) {
			console.warn("already has current")
			return;
		}
		socket.current = new WebSocket(url);
		const currentSocket = socket.current;

		currentSocket.onopen = () => joinRoom(roomId, userName);
		currentSocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
			if (data.shouldReset) {
				onReset();
			}
			const users: { name: string; cardNumber: Vote }[] = data.users;
			const participants: Participant[] = users.map((value) => {
				return ({
					name: value.name,
					vote: value.cardNumber
				});
			});
			setParticipants(() => participants);
		};

		currentSocket.onclose = () => {
			console.log("WebSocket Disconnected");
			socket.current = null;
		};
		currentSocket.onerror = (error) => console.error("WebSocket Error", error);

		return () => currentSocket?.close();
	}, []);

	const sendMessage = (message: string) => {
		socket.current?.send(message);
	};

	const joinRoom = (roomId: string, userName: string) => {
		sendMessage(
			JSON.stringify({
				action: "joinRoom",
				roomId: roomId,
				userName: userName,
			}),
		);
	};

	const submitCard = (roomId: string, selectedCardNumber: Vote) => {
		sendMessage(
			JSON.stringify({
				action: "submitCard",
				roomId,
				cardNumber: selectedCardNumber,
			}),
		);
	};

	const resetRoom = (roomId: string) => {
		sendMessage(
			JSON.stringify({
				action: "resetRoom",
				roomId: roomId,
			}),
		);
	};

	const revealAllCards = (roomId: string) => {
		sendMessage(
			JSON.stringify({
				action: "revealAllCards",
				roomId: roomId,
			}),
		);
	};

	return { participants, joinRoom, submitCard, resetRoom, revealAllCards };
};

export default useWebSocket;
