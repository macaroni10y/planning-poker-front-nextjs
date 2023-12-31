import Cards from "@/app/_components/containers/Cards";
import ParticipantList from "@/app/_components/containers/ParticipantsList";
import VoteResultsContainer from "@/app/_components/containers/VoteResultsContainer";
import { Participant } from "@/app/_types/types";
import React from "react";

const Page = ({ params }: { params: { roomId: string } }) => {
	const participants: Participant[] = [
		{
			name: "hoge",
			vote: 2,
		},
		{
			name: "piyo",
			vote: "not yet",
		},
		{
			name: "piyo",
			vote: "not yet",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
		{
			name: "piyo",
			vote: "skip",
		},
	];
	return (
		<div className="flex flex-col items-center bg-amber-700">
			<div>this room is {params.roomId}</div>
			<VoteResultsContainer
				participantVotes={participants.map((it) => it.vote)}
			/>
			<ParticipantList participants={participants} />
			<Cards />
		</div>
	);
};

export default Page;
