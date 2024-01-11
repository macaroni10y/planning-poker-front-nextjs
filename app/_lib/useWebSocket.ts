import { nameNotSet } from "@/app/_lib/atoms";
import { Participant, Vote } from "@/app/_types/types";
import { useEffect, useRef, useState } from "react";

interface UseWebSocket {
	participants: Participant[];
	joinRoom: (roomId: string, userName: string) => void;
	submitCard: (roomId: string, selectedCardNumber: Vote) => void;
	resetRoom: (roomId: string) => void;
	revealAllCards: (roomId: string) => void;
}

interface Props {
	roomId: string;
	userName: string;
	/**
	 * a function invoked when "shouldReset" property in a websocket message is true
	 */
	onReset: () => void;
}

const useWebSocket = ({ roomId, userName, onReset }: Props): UseWebSocket => {
	const socket = useRef<WebSocket | null>(null);
	const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
	const [participants, setParticipants] = useState<Participant[]>([]);
	const url = "wss://sjy1ekd1t6.execute-api.ap-northeast-1.amazonaws.com/v1/";

	const startHeartbeat = () =>
		heartbeatInterval.current = setInterval(() => {
			console.log("send ping");
			sendMessage("ping");
		}, 1000 * 60 * 9);

	const stopHeartbeat = () => {
		if (heartbeatInterval.current) {
			clearInterval(heartbeatInterval.current);
			heartbeatInterval.current = null;
		}
	};

	useEffect(() => {
		if (userName === nameNotSet) return () => {};
		socket.current = new WebSocket(url);
		const currentSocket = socket.current;

		currentSocket.onopen = () => {
			console.log("WebSocket connected");
			startHeartbeat();
			joinRoom(roomId, userName);
		};
		currentSocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.shouldReset) {
				onReset();
			}
			const users: { name: string; cardNumber: Vote }[] = data.users;
			const participants: Participant[] = users.map((value) => {
				return {
					name: value.name,
					vote: value.cardNumber,
				};
			});
			setParticipants(() => participants);
		};
		currentSocket.onclose = () => {
			console.log("WebSocket closed");
			stopHeartbeat();
		}

		return () => currentSocket?.close();
	}, [userName, roomId, onReset]);

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
