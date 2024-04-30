import { nameNotSet } from "@/app/_lib/atoms";
import type { Participant, Vote } from "@/app/_types/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseWebSocket {
	participants: Participant[];
	cardControls: {
		submit: (roomId: string, selectedCardNumber: Vote) => void;
		reset: (roomId: string) => void;
		revealAll: (roomId: string) => void;
	};
	timerControls: {
		reset: (roomId: string) => void;
		resume: (roomId: string, time: number) => void;
		pause: (roomId: string, time: number) => void;
	};
}

interface Props {
	roomId: string;
	userName: string;
	/**
	 * a function invoked when "shouldReset" property in a websocket message is true
	 */
	onResetVote: () => void;
	/**
	 * a function invoked when "reset" operation is from a websocket message
	 */
	onReceiveResetTimerMessage: () => void;
	/**
	 * a function invoked when "pause" operation is from a websocket message
	 */
	onReceivePauseTimerMessage: (time: number) => void;
	/**
	 * a function invoked when "resume" operation is from a websocket message
	 */
	onReceiveResumeTimerMessage: (time: number) => void;
}

const useWebSocket = ({
	roomId,
	userName,
	onResetVote,
	onReceiveResetTimerMessage,
	onReceivePauseTimerMessage,
	onReceiveResumeTimerMessage
}: Props): UseWebSocket => {
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

	/**
	 * send a message to reset timers for specified room
	 * @param roomId
	 */
	const resetTimer = (roomId: string) => {
		socket.current?.send(
			JSON.stringify({
				action: "resetTimer",
				roomId,
			}),
		);
	};

	/**
	 * send a message to resume timers for specified room
	 * @param roomId
	 * @param time continue with
	 */
	const resumeTimer = (roomId: string, time: number) => {
		socket.current?.send(
			JSON.stringify({
				action: "resumeTimer",
				roomId,
				time,
			}),
		);
	};

	/**
	 * send a message to pause timers for specified room
	 * @param roomId
	 * @param time pause with
	 */
	const pauseTimer = (roomId: string, time: number) => {
		socket.current?.send(
			JSON.stringify({
				action: "pauseTimer",
				roomId,
				time,
			}),
		);
	};

	useEffect(() => {
		if (userName === nameNotSet) return () => {};
		if (socket.current?.readyState === WebSocket.OPEN) {
			socket.current.close();
		}
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

			if(data.type === "resetTimer") {
				onReceiveResetTimerMessage();
				return;
			}
			if(data.type === "pauseTimer") {
				onReceivePauseTimerMessage(data.time);
				return;
			}
			if(data.type === "resumeTimer") {
				onReceiveResumeTimerMessage(data.time);
				return;
			}

			if (data.shouldReset) {
				onResetVote();
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
		return () => currentSocket.close();
	}, [userName, roomId, onResetVote, joinRoom]);

	return {
		participants,
		cardControls: {
			submit: submitCard,
			reset: resetRoom,
			revealAll: revealAllCards,
		},
		timerControls: {
			reset: resetTimer,
			resume: resumeTimer,
			pause: pauseTimer,
		},
	};
};

export default useWebSocket;
