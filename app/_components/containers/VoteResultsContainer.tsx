import DummyOneVoteResult from "@/app/_components/uiparts/DummyOneVoteResult";
import OneVoteResult from "@/app/_components/uiparts/OneVoteResult";
import { average, mode, scrumDecision } from "@/app/_lib/voteResultCalculate";
import {
    type CountableVote,
    type Vote,
    isCountableVote,
} from "@/app/_types/types";

interface Props {
    participantVotes: Vote[];
}

const VoteResults = (
    participantVotes: Vote[],
    availableVotes: CountableVote[],
    voteCompleted: boolean,
) => {
    if (participantVotes.length === 0) {
        return (
            <>
                <DummyOneVoteResult title="average" />
                <DummyOneVoteResult title="mode" />
                <DummyOneVoteResult title="scrum decision" />
            </>
        );
    }
    return (
        <>
            <OneVoteResult
                title="average"
                value={average(availableVotes).toString()}
                voteCompleted={voteCompleted}
            />
            <OneVoteResult
                title="mode"
                value={mode(availableVotes)}
                voteCompleted={voteCompleted}
            />
            <OneVoteResult
                title="scrum decision"
                value={scrumDecision(availableVotes).toString()}
                voteCompleted={voteCompleted}
            />
        </>
    );
};

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
            {VoteResults(participantVotes, availableVotes, voteCompleted)}
        </div>
    );
};

export default VoteResultsContainer;
