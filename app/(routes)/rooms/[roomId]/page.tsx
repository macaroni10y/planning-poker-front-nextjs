"use client";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";
import useWebSocket from "@/app/_lib/useWebSocket";
import { Vote } from "@/app/_types/types";
import React, { useState } from "react";

const Page = ({ params }: { params: { roomId: string } }) => {
	const [selectedCardNumber, selectCardNumber] = useState<Vote>("not yet");
	const connection = useWebSocket({
		url: "wss://sjy1ekd1t6.execute-api.ap-northeast-1.amazonaws.com/v1/",
		roomId: params.roomId,
		userName: "nextjs",
		onReset: () => selectCardNumber(() => "not yet"),
	});

	return (
		<div className="flex flex-col items-center bg-pink-50">
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
			<Cards onSelect={(target) => {
				selectCardNumber(target);
				connection.submitCard(params.roomId, target);
			}} selectedCard={selectedCardNumber}/>
		</div>
	);
};

export default Page;
