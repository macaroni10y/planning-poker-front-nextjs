import NameAndVote from "@/app/_components/uiparts/NameAndVote";
import { Participant, isCountableVote } from "@/app/_types/types";

interface Props {
	participants: Participant[];
}

const ListHeader = () => (
	<div className="justify-around items-center flex border-black border-2">
		<div className="p-1 font-bold bg-amber-300 flex justify-center items-center">
			name
		</div>
		<div className="p-1 font-bold bg-amber-400 flex justify-center items-center">
			vote
		</div>
	</div>
);

const ParticipantList = (props: Props) => (
	<div className="flex justify-center items-center w-full max-w-3xl">
		<div className="rounded-2xl p-3 bg-cyan-400  w-full">
			<ListHeader />
			<div className="overflow-y-scroll max-h-60">
				{props.participants.map((participant) => (
					<NameAndVote
						key={participant.name}
						name={participant.name}
						showVote={props.participants.every((it) =>
							isCountableVote(it.vote),
						)}
						vote={participant.vote}
					/>
				))}
			</div>
		</div>
	</div>
);

export default ParticipantList;
