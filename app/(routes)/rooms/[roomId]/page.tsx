"use client";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import Header from "@/app/_components/uiparts/Header";
import Timer from "@/app/_components/uiparts/Timer";
import { nameNotSet, userNameAtom } from "@/app/_lib/atoms";
import useWebSocket from "@/app/_lib/useWebSocket";
import type { Vote } from "@/app/_types/types";
import { createClient } from "@/utils/supabase/client";
import { useAtom } from "jotai/index";
import React, { useCallback, useRef, useState } from "react";
import {useRouter} from "next/navigation";

const Page = ({ params }: { params: { roomId: string } }) => {
	const router = useRouter();
	const extractedRoomId = params.roomId.substring(0, 12);
	const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
	const [userName, setUserName] = useAtom(userNameAtom);

	// dialog
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	// timer
	const [currentTime, setCurrentTime] = useState<number>(0);
	const timerId = useRef<NodeJS.Timeout | null>(null);
	const [isPaused, setIsPaused] = useState(true);

	// websocket
	const connection = useWebSocket({
		roomId: extractedRoomId,
		userName: userName,
		onResetVote: useCallback(() => selectCardNumber(() => "not yet"), []),
		onReceiveResetTimerMessage: () => handleReceptionOfResetTimerOperation(),
		onReceivePauseTimerMessage: (time: number) =>
			handleReceptionOfPauseTimerOperation(time),
		onReceiveResumeTimerMessage: (time: number) =>
			handleReceptionOfResumeTimerOperation(time),
	});

	const supabase = createClient();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/login");
	};

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

	const timerElement = (
		<Timer
			currentTime={currentTime}
			isPaused={isPaused}
			onTapPauseButton={() =>
				connection.timerControls.pause(extractedRoomId, currentTime)
			}
			onTapResumeButton={() =>
				connection.timerControls.resume(extractedRoomId, currentTime)
			}
			onTapResetButton={() => connection.timerControls.reset(extractedRoomId)}
		/>
	);

	return (
		<>
			<div className="h-screen bg-pink-50">
				<Header
					roomId={extractedRoomId}
					onEdit={() => setIsDialogOpen(true)}
					renderTimer={() => timerElement}
					onLogout={handleLogout}
					userName={userName}
				/>
				<div className="flex flex-col items-center h-5/6">
					<VoteResultsContainer
						participantVotes={connection.participants.map((it) => it.vote)}
					/>
					<ParticipantList participants={connection.participants} />
					<ButtonsContainer
						onClickNextVote={() => {
							connection.cardControls.reset(extractedRoomId);
							connection.timerControls.reset(extractedRoomId);
						}}
						onClickReveal={() =>
							connection.cardControls.revealAll(extractedRoomId)
						}
					/>
					<Cards
						onSelect={(target) => {
							selectCardNumber(target);
							connection.cardControls.submit(extractedRoomId, target);
						}}
						selectedCard={selectedCardNumber}
					/>
				</div>
			</div>
			<EditNameDialog
				isOpen={userName === nameNotSet || isDialogOpen}
				onClick={async (candidate: string) => {
					await supabase.auth.updateUser({
						data: { nickname: candidate },
					});
					setUserName(candidate);
				}}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
};

export default Page;
