import { nameNotSet } from "@/app/_lib/atoms";
import { Participant, Vote } from "@/app/_types/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocket {
	participants: Participant[];
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
	const [participants, setParticipants] = useState<Participant[]>([]);
	const url = "wss://sjy1ekd1t6.execute-api.ap-northeast-1.amazonaws.com/v1/";

	const joinRoom = useCallback((roomId: string, userName: string) => {
		if (socket.current?.readyState === WebSocket.OPEN) {
			socket.current?.send(
				JSON.stringify({
					action: "joinRoom",
					roomId,
					userName,
				}),
			);
		}
	}, []);

	const submitCard = (roomId: string, selectedCardNumber: Vote) => {
		socket.current?.send(
			JSON.stringify({
				action: "submitCard",
				roomId,
				cardNumber: selectedCardNumber,
			}),
		);
	};

	const resetRoom = (roomId: string) => {
		socket.current?.send(
			JSON.stringify({
				action: "resetRoom",
				roomId,
			}),
		);
	};

	const revealAllCards = (roomId: string) => {
		socket.current?.send(
			JSON.stringify({
				action: "revealAllCards",
				roomId,
			}),
		);
	};

	useEffect(() => {
		if (userName === nameNotSet) return () => {};
		socket.current = new WebSocket(url);
		const currentSocket = socket.current;

		currentSocket.onopen = () => {
			const heartbeatInterval = setInterval(
				() => socket.current?.send("ping"),
				1000 * 60 * 9,
			);
			joinRoom(roomId, userName);
			return () => {
				currentSocket?.close();
				clearInterval(heartbeatInterval);
			};
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
		currentSocket.onclose = () => {};
		return () => currentSocket?.close()
	}, [userName, roomId, onReset, joinRoom]);

	return { participants, submitCard, resetRoom, revealAllCards };
};

export default useWebSocket;
