import OneVoteResult from "@/app/_components/uiparts/OneVoteResult";
import { average, mode, scrumDecision } from "@/app/_lib/voteResultCalculate";
import { CountableVote, Vote, isCountableVote } from "@/app/_types/types";

interface Props {
	participantVotes: Vote[];
}

/**
 * contain multiple vote results such as average, mode...
 * @param participantVotes
 * @constructor
 */
const VoteResultsContainer = ({ participantVotes }: Props) => {
	const availableVotes = participantVotes.filter((it): it is CountableVote =>
		isCountableVote(it),
	) as CountableVote[];

	const voteCompleted = participantVotes.every((it) => "not yet" !== it);
	return (
		<div className="flex justify-center w-full max-w-5xl">
			<OneVoteResult
				title="average"
				value={average(availableVotes).toString()}
				voteCompleted={voteCompleted}
			/>
			<OneVoteResult
				title="mode"
				value={mode(availableVotes).toString()}
				voteCompleted={voteCompleted}
			/>
			<OneVoteResult
				title="scrum decision"
				value={scrumDecision(availableVotes).toString()}
				voteCompleted={voteCompleted}
			/>
		</div>
	);
};

export default VoteResultsContainer;
