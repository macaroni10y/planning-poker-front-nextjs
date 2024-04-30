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
import React, { useCallback, useEffect, useState } from "react";

const Page = ({ params }: { params: { roomId: string } }) => {
	const extractedRoomId = params.roomId.substring(0, 12);
	const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
	const [userName, setUserName] = useAtom(userNameAtom);

	// dialog
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	// timer
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

	// websocket
	const connection = useWebSocket({
		roomId: extractedRoomId,
		userName: userName,
		onResetVote: useCallback(() => selectCardNumber(() => "not yet"), []),
		onReceiveResumeTimerMessage: useCallback(
			(time: number) => handleReceptionOfResumeTimerOperation(time),
			[],
		),
		onReceivePauseTimerMessage: useCallback(
			(time: number) => handleReceptionOfPauseTimerOperation(time),
			[],
		),
		onReceiveResetTimerMessage: useCallback(
			() => handleReceptionOfResetTimerOperation(),
			[],
		),
	});

	/**
	 * start new timer
	 * @return a timeout created in this function
	 */
	const startTimer = useCallback(() => {
		const created = setInterval(() => {
			setCurrentTime((current) => current + 1);
		}, 1000);
		setTimerId(created);
		return () => clearInterval(created);
	}, []);

	useEffect(() => startTimer(), [startTimer]);

	/**
	 * an operation when a message to resume timers with specified time is received
	 */
	const handleReceptionOfResumeTimerOperation = (resumeFrom: number) => {
		if (timerId) {
			clearInterval(timerId);
			setTimerId(null);
		}
		setCurrentTime(resumeFrom);
		startTimer();
	};

	/**
	 * an operation when a message to pause timers is received
	 */
	const handleReceptionOfPauseTimerOperation = (time: number) => {
		if (timerId) {
			clearInterval(timerId);
			setTimerId(null);
		}
		setCurrentTime(time);
	};

	/**
	 * an operation when a message to reset timers is received
	 */
	const handleReceptionOfResetTimerOperation = () => {
		if (timerId) {
			clearInterval(timerId);
		}
		setCurrentTime(0);
		startTimer();
	};

	const timerElement = (
		<Timer
			currentTime={currentTime}
			isPaused={!timerId}
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
