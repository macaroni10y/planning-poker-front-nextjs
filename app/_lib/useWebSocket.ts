import { useCallback, useEffect, useRef, useState } from "react";
import { nameNotSet } from "@/app/_lib/atoms";
import type { Participant, Vote } from "@/app/_types/types";
import { createClient } from "@/utils/supabase/client";

type ConnectionState =
    | "connecting"
    | "connected"
    | "disconnected"
    | "reconnecting";

interface UseWebSocket {
    participants: Participant[];
    connectionState: ConnectionState;
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

const MAX_RETRY_COUNT = 10;
const MAX_RETRY_DELAY_MS = 30000;

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
    const [connectionState, setConnectionState] =
        useState<ConnectionState>("disconnected");
    const url = "wss://sjy1ekd1t6.execute-api.ap-northeast-1.amazonaws.com/v1/";

    const retryCount = useRef(0);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const callbacksRef = useRef({
        onResetVote,
        onReceiveResetTimerMessage,
        onReceivePauseTimerMessage,
        onReceiveResumeTimerMessage,
        onReceiveReaction,
        onAllVotesMatch,
    });
    useEffect(() => {
        callbacksRef.current = {
            onResetVote,
            onReceiveResetTimerMessage,
            onReceivePauseTimerMessage,
            onReceiveResumeTimerMessage,
            onReceiveReaction,
            onAllVotesMatch,
        };
    });

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
            if (socket.current?.readyState !== WebSocket.OPEN) return;
            socket.current.send(
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
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current.send(
            JSON.stringify({
                action: "resetRoom",
                roomId,
            }),
        );
    }, []);

    const revealAllCards = useCallback((roomId: string) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current.send(
            JSON.stringify({
                action: "revealAllCards",
                roomId,
            }),
        );
    }, []);

    const resetTimer = useCallback((roomId: string) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current.send(
            JSON.stringify({
                action: "resetTimer",
                roomId,
            }),
        );
    }, []);

    const resumeTimer = useCallback((roomId: string, time: number) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current.send(
            JSON.stringify({
                action: "resumeTimer",
                roomId,
                time,
            }),
        );
    }, []);

    const pauseTimer = useCallback((roomId: string, time: number) => {
        if (socket.current?.readyState !== WebSocket.OPEN) return;
        socket.current.send(
            JSON.stringify({
                action: "pauseTimer",
                roomId,
                time,
            }),
        );
    }, []);

    const sendReaction = useCallback(
        (emoji: string) => {
            if (socket.current?.readyState !== WebSocket.OPEN) return;
            socket.current.send(
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

        let isCancelled = false;
        let heartbeatInterval: NodeJS.Timeout | null = null;

        const connectWithAuth = async () => {
            try {
                setConnectionState(
                    retryCount.current > 0 ? "reconnecting" : "connecting",
                );

                // Supabase JWTトークンを取得
                const supabase = createClient();
                const { data, error } = await supabase.auth.getSession();

                if (isCancelled) return;

                if (error || !data.session?.access_token) {
                    console.error("Failed to get auth token:", error);
                    setConnectionState("disconnected");
                    return;
                }

                const token = data.session.access_token;

                // 既存の接続をクローズ
                if (socket.current?.readyState === WebSocket.OPEN) {
                    socket.current.close();
                }

                // JWTをクエリパラメータとして接続
                const authenticatedUrl = `${url}?token=${encodeURIComponent(token)}`;
                socket.current = new WebSocket(authenticatedUrl);
                const currentSocket = socket.current;

                currentSocket.onopen = () => {
                    setConnectionState("connected");
                    retryCount.current = 0;
                    heartbeatInterval = setInterval(
                        () => socket.current?.send("ping"),
                        1000 * 60 * 5,
                    );
                    joinRoom(roomId, userName);
                };

                currentSocket.onmessage = (event) => {
                    let data: unknown;
                    try {
                        data = JSON.parse(event.data);
                    } catch {
                        console.error(
                            "Failed to parse WebSocket message:",
                            event.data,
                        );
                        return;
                    }

                    const msg = data as Record<string, unknown>;

                    if (msg.type === "resetTimer") {
                        callbacksRef.current.onReceiveResetTimerMessage();
                        return;
                    }
                    if (msg.type === "pauseTimer") {
                        callbacksRef.current.onReceivePauseTimerMessage(
                            msg.time as number,
                        );
                        return;
                    }
                    if (msg.type === "resumeTimer") {
                        callbacksRef.current.onReceiveResumeTimerMessage(
                            msg.time as number,
                        );
                        return;
                    }

                    if (msg.type === "reaction") {
                        callbacksRef.current.onReceiveReaction(
                            msg.kind as string,
                            msg.from as string,
                        );
                        return;
                    }

                    if (msg.shouldReset) {
                        callbacksRef.current.onResetVote();
                    }
                    const users: {
                        clientId: string;
                        name: string;
                        cardNumber: Vote;
                    }[] = (msg.users as never[]) || [];
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
                        callbacksRef.current.onAllVotesMatch();
                    }
                    setParticipants(participants);
                };

                currentSocket.onerror = () => {
                    console.error("WebSocket error");
                };

                currentSocket.onclose = () => {
                    setConnectionState("disconnected");
                    if (heartbeatInterval) {
                        clearInterval(heartbeatInterval);
                        heartbeatInterval = null;
                    }

                    if (!isCancelled && retryCount.current < MAX_RETRY_COUNT) {
                        const delay = Math.min(
                            1000 * 2 ** retryCount.current,
                            MAX_RETRY_DELAY_MS,
                        );
                        retryCount.current += 1;
                        reconnectTimeout.current = setTimeout(() => {
                            connectWithAuth();
                        }, delay);
                    }
                };
            } catch (err) {
                if (!isCancelled) {
                    console.error("WebSocket connection error:", err);
                    setConnectionState("disconnected");
                }
            }
        };

        connectWithAuth();

        return () => {
            isCancelled = true;
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
            socket.current?.close();
        };
    }, [userName, roomId, joinRoom]);

    return {
        participants,
        connectionState,
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
