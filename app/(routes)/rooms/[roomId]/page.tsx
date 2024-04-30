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
import { useAtom } from "jotai/index";
import React, {useCallback, useEffect, useRef, useState} from "react";

const Page = ({ params }: { params: { roomId: string } }) => {
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
		onReceiveResetTimerMessage:
			() => handleReceptionOfResetTimerOperation(),
		onReceivePauseTimerMessage:
			(time: number) => handleReceptionOfPauseTimerOperation(time),
		onReceiveResumeTimerMessage:
			(time: number) => handleReceptionOfResumeTimerOperation(time),
	});

	/**
	 * start new timer
	 * @return a timeout created in this function
	 */
	const startTimer = useCallback(() => {
		if (timerId.current) {
			console.log("clear by start: " + timerId.current);
			clearInterval(timerId.current);
		}
		const created = setInterval(() => {
			setCurrentTime((current) => current + 1);
		}, 1000);
		timerId.current = created;
		setIsPaused(false);
		console.log("created: " + created);
		return () => {
			console.log("clear by callback: " + created);
			clearInterval(created);
		};
	}, [timerId]);

	const clearTimer = useCallback(() => {
		console.log(`clear timer: ${timerId.current}`);
		if (timerId.current) {
			clearInterval(timerId.current);
			timerId.current = null;
			setIsPaused(true);
		}
	}, [timerId, startTimer]);

	useEffect(() => {
		const clearSelf = startTimer();
		return () => clearSelf();
	}, []);

	/**
	 * an operation when a message to resume timers with specified time is received
	 */
	const handleReceptionOfResumeTimerOperation = useCallback(((resumeFrom: number) => {
		setCurrentTime(resumeFrom);
		startTimer();
	}), [startTimer]);

	/**
	 * an operation when a message to pause timers is received
	 */
	const handleReceptionOfPauseTimerOperation = useCallback((time: number) => {
		setCurrentTime(time);
		clearTimer();
	},[clearTimer]);

	/**
	 * an operation when a message to reset timers is received
	 */
	const handleReceptionOfResetTimerOperation = useCallback(() => {
		console.log(`reset timerId:${timerId.current}`);
		clearTimer();
		setCurrentTime(0);
		startTimer();
	}, [startTimer, clearTimer]);

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
				/>
				<div className="flex flex-col items-center h-5/6">
					<VoteResultsContainer
						participantVotes={connection.participants.map((it) => it.vote)}
					/>
					<ParticipantList participants={connection.participants} />
					<ButtonsContainer
						onClickNextVote={() =>
							connection.cardControls.reset(extractedRoomId)
						}
						onClickReveal={() => {
							connection.cardControls.revealAll(extractedRoomId);
						}}
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
				onClick={(candidate: string) => {
					setUserName(candidate);
				}}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
};

export default Page;
