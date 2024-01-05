"use client";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import Dialog from "@/app/_components/uiparts/Dialog";
import {nameNotSet, userNameAtom} from "@/app/_lib/atoms";
import useWebSocket from "@/app/_lib/useWebSocket";
import { Vote } from "@/app/_types/types";
import React, { useCallback, useState } from "react";
import {useAtom} from "jotai/index";
import TheButton from "@/app/_components/uiparts/TheButton";

const Page = ({ params }: { params: { roomId: string } }) => {
	const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
	const [userName, setUserName] = useAtom(userNameAtom);
	console.log(nameNotSet === userName)
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const connection = useWebSocket({
		roomId: params.roomId,
		userName: userName,
		onReset: useCallback(() => selectCardNumber(() => "not yet"), []),
	});

	return (
		<div className="flex flex-col items-center bg-pink-50">
			<TheButton onClick={() => setIsOpen(!isOpen)} text="toggle dialog"></TheButton>
			<Dialog isOpen={isOpen} onClick={(candidate: string) => {
				setUserName(candidate);
				setIsOpen(() => false);
			}}/>
			<CopyToClipBoard
				displayName="copy URL"
				copyTarget={window.location.href}
			/>
			<VoteResultsContainer
				participantVotes={connection.participants.map((it) => it.vote)}
			/>
			<ParticipantList participants={connection.participants} />
			<ButtonsContainer
				onClickNextVote={() => connection.resetRoom(params.roomId)}
				onClickReveal={() => {
					connection.revealAllCards(params.roomId);
				}}
			/>
			<Cards
				onSelect={(target) => {
					selectCardNumber(target);
					connection.submitCard(params.roomId, target);
				}}
				selectedCard={selectedCardNumber}
			/>
		</div>
	);
};

export default Page;
