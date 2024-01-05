import NameAndVote from "@/app/_components/uiparts/NameAndVote";
import {
	Participant,
	isCountableVote,
	isVotableVote,
} from "@/app/_types/types";

interface Props {
	participants: Participant[];
}

const ListHeader = () => (
	<div className="justify-around items-center flex">
		<div className="p-2 font-bold flex justify-center items-center">name</div>
		<div className="p-2 font-bold flex justify-center items-center">vote</div>
	</div>
);

const ParticipantList = (props: Props) => {
	return (
		<div className="flex justify-center items-center w-full max-w-5xl">
			<div className="rounded-xl p-3 w-full bg-white min-h-64">
				<ListHeader />
				<div className="overflow-y-auto max-h-60">
					{props.participants.map((participant) => (
						<NameAndVote
							key={participant.name}
							name={participant.name}
							showVote={props.participants.every((it) => {
								return isVotableVote(it.vote);
							})}
							vote={participant.vote}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ParticipantList;
