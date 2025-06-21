import { useCallback, useEffect, useRef, useState } from "react";
import { nameNotSet } from "@/app/_lib/atoms";
import type { Participant, Vote } from "@/app/_types/types";

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
    reactionControls: {
        send: (emoji: string) => void;
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

    /**
     * Callback function triggered when a reaction is received.
     *
     */
    onReceiveReaction: (emoji: string, sender: string) => void;

    /**
     * a function invoked when all participants' votes are identical
     */
    onAllVotesMatch: () => void;
}

const useWebSocket = ({
    roomId,
    userName,
    onResetVote,
    onReceiveResetTimerMessage,
    onReceivePauseTimerMessage,
    onReceiveResumeTimerMessage,
    onReceiveReaction,
    onAllVotesMatch,
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

    const submitCard = useCallback(
        (roomId: string, selectedCardNumber: Vote) => {
            socket.current?.send(
                JSON.stringify({
                    action: "submitCard",
                    roomId,
                    cardNumber: selectedCardNumber,
                }),
            );
        },
        [],
    );

    const resetRoom = useCallback((roomId: string) => {
        socket.current?.send(
            JSON.stringify({
                action: "resetRoom",
                roomId,
            }),
        );
    }, []);

    const revealAllCards = useCallback((roomId: string) => {
        socket.current?.send(
            JSON.stringify({
                action: "revealAllCards",
                roomId,
            }),
        );
    }, []);

    /**
     * send a message to reset timers for specified room
     * @param roomId
     */
    const resetTimer = useCallback((roomId: string) => {
        socket.current?.send(
            JSON.stringify({
                action: "resetTimer",
                roomId,
            }),
        );
    }, []);

    /**
     * send a message to resume timers for specified room
     * @param roomId
     * @param time continue with
     */
    const resumeTimer = useCallback((roomId: string, time: number) => {
        socket.current?.send(
            JSON.stringify({
                action: "resumeTimer",
                roomId,
                time,
            }),
        );
    }, []);

    /**
     * send a message to pause timers for specified room
     * @param roomId
     * @param time pause with
     */
    const pauseTimer = useCallback((roomId: string, time: number) => {
        socket.current?.send(
            JSON.stringify({
                action: "pauseTimer",
                roomId,
                time,
            }),
        );
    }, []);

    const sendReaction = useCallback(
        (emoji: string) => {
            socket.current?.send(
                JSON.stringify({
                    action: "reaction",
                    roomId,
                    kind: emoji,
                    spread: false,
                }),
            );
        },
        [roomId],
    );

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
                1000 * 60 * 5,
            );
            joinRoom(roomId, userName);
            return () => {
                currentSocket?.close();
                clearInterval(heartbeatInterval);
            };
        };
        currentSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "resetTimer") {
                onReceiveResetTimerMessage();
                return;
            }
            if (data.type === "pauseTimer") {
                onReceivePauseTimerMessage(data.time);
                return;
            }
            if (data.type === "resumeTimer") {
                onReceiveResumeTimerMessage(data.time);
                return;
            }

            if (data.type === "reaction") {
                onReceiveReaction(data.kind, data.from);
                return;
            }

            if (data.shouldReset) {
                onResetVote();
            }
            const users: {
                clientId: string;
                name: string;
                cardNumber: Vote;
            }[] = data.users || [];
            const participants: Participant[] = users.map((value) => ({
                clientId: value.clientId,
                name: value.name,
                vote: value.cardNumber,
            }));
            if (participants.length === 0) {
                return;
            }
            if (
                participants.every((it) => {
                    return (
                        it.vote !== "not yet" &&
                        it.vote === participants[0].vote
                    );
                })
            ) {
                onAllVotesMatch();
            }
            setParticipants(participants);
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
        reactionControls: {
            send: sendReaction,
        },
    };
};

export default useWebSocket;
