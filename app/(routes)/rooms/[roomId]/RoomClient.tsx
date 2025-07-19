"use client";
import { useAtom } from "jotai/index";
import { useCallback, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import ReactionButtonContainer from "@/app/_components/containers/ReactionButtonContainer";
import ScrumCards from "@/app/_components/containers/ScrumCards";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import ReactionPopup from "@/app/_components/features/reactions/ReactionPopup";
import CopyToClipBoard from "@/app/_components/features/room/CopyToClipBoard";
import EditNameDialog from "@/app/_components/features/room/EditNameDialog";
import ThemeSelector from "@/app/_components/features/voting/ThemeSelector";
import Timer from "@/app/_components/features/voting/Timer";
import Header from "@/app/_components/ui/layout/Header";
import HeaderItem from "@/app/_components/ui/layout/HeaderItem";
import { userNameAtom } from "@/app/_lib/atoms";
import useWebSocket from "@/app/_lib/useWebSocket";
import type { Reaction, ReactionType, Vote } from "@/app/_types/types";
import { createClient } from "@/utils/supabase/client";

interface RoomClientProps {
    roomId: string;
}

const RoomClient = ({ roomId }: RoomClientProps) => {
    const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
    const [userName, setUserName] = useAtom(userNameAtom);

    // confetti
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const { width, height } = useWindowSize();

    // reaction
    const [reactions, setReactions] = useState<Reaction[]>([]);

    // timer
    const [currentTime, setCurrentTime] = useState<number>(0);
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const [isPaused, setIsPaused] = useState(true);

    // websocket
    const connection = useWebSocket({
        roomId: roomId,
        userName: userName,
        onResetVote: useCallback(() => {
            setShowConfetti(false);
            selectCardNumber(() => "not yet");
        }, []),
        onReceiveResetTimerMessage: () =>
            handleReceptionOfResetTimerOperation(),
        onReceivePauseTimerMessage: (time: number) =>
            handleReceptionOfPauseTimerOperation(time),
        onReceiveResumeTimerMessage: (time: number) =>
            handleReceptionOfResumeTimerOperation(time),
        onReceiveReaction: (kind, sender) =>
            handleReceiveReaction(kind, sender),
        onAllVotesMatch: () => handleAllVotesMatch(),
    });

    const supabase = createClient();

    /**
     * start new timer
     * @return a timeout created in this function
     */
    const startTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
        }
        const created = setInterval(() => {
            setCurrentTime((current) => current + 1);
        }, 1000);
        timerId.current = created;
        setIsPaused(false);
        return () => clearInterval(created);
    };

    const clearTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
            timerId.current = null;
            setIsPaused(true);
        }
    };

    /**
     * an operation when a message to resume timers with specified time is received
     */
    const handleReceptionOfResumeTimerOperation = (resumeFrom: number) => {
        setCurrentTime(resumeFrom);
        startTimer();
    };

    /**
     * an operation when a message to pause timers is received
     */
    const handleReceptionOfPauseTimerOperation = (time: number) => {
        setCurrentTime(time);
        clearTimer();
    };

    /**
     * an operation when a message to reset timers is received
     */
    const handleReceptionOfResetTimerOperation = () => {
        clearTimer();
        setCurrentTime(0);
        startTimer();
    };

    const removeReaction = (id: string) => {
        setReactions((prevReactions) =>
            prevReactions.filter((reaction) => reaction.id !== id),
        );
    };
    /**
     * an operation when a reaction comes
     * @param kind reaction type
     * @param sender sender client name
     */
    const handleReceiveReaction = (kind: ReactionType, sender: string) => {
        const newReaction: Reaction = {
            id: Math.floor(Math.random() * 100000).toString(),
            x: Math.random() * 800 - 400,
            y: Math.random() * 100 - 50,
            username: sender,
            type: kind,
        };
        setReactions((prevReactions) => [...prevReactions, newReaction]);
        setTimeout(() => removeReaction(newReaction.id), 2500);
    };

    const handleAllVotesMatch = () => {
        setShowConfetti(true);
    };

    const timerElement = (
        <Timer
            currentTime={currentTime}
            isPaused={isPaused}
            onTapPauseButton={() =>
                connection.timerControls.pause(roomId, currentTime)
            }
            onTapResumeButton={() =>
                connection.timerControls.resume(roomId, currentTime)
            }
            onTapResetButton={() => connection.timerControls.reset(roomId)}
        />
    );

    return (
        <div className="h-screen bg-background">
            {showConfetti && (
                <Confetti width={width} height={height} recycle={false} />
            )}
            {reactions.map((reaction) => (
                <ReactionPopup
                    key={reaction.id}
                    reaction={reaction.type}
                    x={reaction.x}
                    y={reaction.y}
                    username={reaction.username}
                />
            ))}
            <Header>
                <HeaderItem className="max-sm:hidden sm:text-xl">
                    {timerElement}
                </HeaderItem>
                <HeaderItem className="sm:text-xl">
                    <CopyToClipBoard
                        copyTarget={globalThis.window?.location.href}
                    >
                        <div className="max-md:hidden">{roomId}</div>
                    </CopyToClipBoard>
                </HeaderItem>
                <HeaderItem className="px-2">
                    <EditNameDialog
                        onSubmit={async (candidate: string) => {
                            await supabase.auth.updateUser({
                                data: { display_name: candidate },
                            });
                            setUserName(candidate);
                        }}
                    />
                </HeaderItem>
                <HeaderItem>
                    <ThemeSelector />
                </HeaderItem>
            </Header>
            <div className="flex flex-col items-center h-5/6">
                <VoteResultsContainer
                    participantVotes={connection.participants.map(
                        (it) => it.vote,
                    )}
                />
                <ParticipantList participants={connection.participants} />
                <ButtonsContainer
                    onClickNextVote={() => {
                        connection.cardControls.reset(roomId);
                        connection.timerControls.reset(roomId);
                    }}
                    onClickReveal={() =>
                        connection.cardControls.revealAll(roomId)
                    }
                />
                <ScrumCards
                    onSelect={(target) => {
                        selectCardNumber(target);
                        connection.cardControls.submit(roomId, target);
                    }}
                    selectedCard={selectedCardNumber}
                />
                <ReactionButtonContainer
                    onClick={(emoji) =>
                        connection.reactionControls.send(emoji.emoji)
                    }
                />
            </div>
        </div>
    );
};

export default RoomClient;
