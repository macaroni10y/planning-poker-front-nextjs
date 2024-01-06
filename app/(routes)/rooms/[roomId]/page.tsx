"use client";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import CurrentName from "@/app/_components/uiparts/CurrentName";
import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import { userNameAtom } from "@/app/_lib/atoms";
import useWebSocket from "@/app/_lib/useWebSocket";
import { Vote } from "@/app/_types/types";
import { useAtom } from "jotai/index";
import React, { useCallback, useState } from "react";

const Page = ({ params }: { params: { roomId: string } }) => {
	const extractedRoomId = params.roomId.substring(0, 12);
	const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
	const [userName, setUserName] = useAtom(userNameAtom);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const connection = useWebSocket({
		roomId: extractedRoomId,
		userName: userName,
		onReset: useCallback(() => selectCardNumber(() => "not yet"), []),
	});

	return (
		<div className="flex flex-col items-center bg-pink-50">
			<CopyToClipBoard
				displayName={extractedRoomId}
				copyTarget={globalThis.window?.location.href}
			/>
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
			<CurrentName onClick={() => setIsOpen(!isOpen)} displayName={userName} />
			<EditNameDialog
				isOpen={isOpen}
				onClick={(candidate: string) => {
					setUserName(candidate);
				}}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
};

export default Page;
