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

	// timer
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

	// dialog
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	// websocket
	const connection = useWebSocket({
		roomId: extractedRoomId,
		userName: userName,
		onReset: useCallback(() => selectCardNumber(() => "not yet"), []),
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
	 * a handler method of resume(▶) button
	 */
	const handleResume = () => {
		if (timerId) {
			clearInterval(timerId);
			setTimerId(null);
		} else {
			startTimer();
		}
	};

	/**
	 * a handler method of pause(⏸) button
	 */
	const handlePause = () => {
		if (timerId) {
			clearInterval(timerId);
			setTimerId(null);
		} else {
			startTimer();
		}
	};

	/**
	 * a handler method of reset　🔄button
	 */
	const handleResetTimer = () => {
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
			onTapPauseButton={handlePause}
			onTapResumeButton={handleResume}
			onTapResetButton={handleResetTimer}
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
						onClickNextVote={() => connection.resetRoom(extractedRoomId)}
						onClickReveal={() => {
							connection.revealAllCards(extractedRoomId);
						}}
					/>
					<Cards
						onSelect={(target) => {
							selectCardNumber(target);
							connection.submitCard(extractedRoomId, target);
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
