"use client";
import ButtonsContainer from "@/app/_components/containers/ButtonsContainer";
import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import { Participant } from "@/app/_types/types";
import React from "react";
import CopyToClipBoard from "@/app/_components/uiparts/CopyToClipBoard";

const Page = ({ params }: { params: { roomId: string } }) => {
	const participants: Participant[] = [
		{
			name: "hoge",
			vote: 2,
		},
		// {
		// 	name: "piyo",
		// 	vote: "not yet",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "not yet",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
		// {
		// 	name: "piyo",
		// 	vote: "skip",
		// },
	];
	return (
		<div className="flex flex-col items-center bg-pink-50">
			<CopyToClipBoard displayName="copy URL" copyTarget={window.location.href}></CopyToClipBoard>
			<VoteResultsContainer
				participantVotes={participants.map((it) => it.vote)}
			/>
			<ParticipantList participants={participants} />
			<ButtonsContainer onClickNextVote={() => {}} onClickReveal={() => {}} />
			<Cards />
		</div>
	);
};

export default Page;
