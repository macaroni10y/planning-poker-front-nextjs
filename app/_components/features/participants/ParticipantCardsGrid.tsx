import DummyParticipantCard from "@/app/_components/features/participants/DummyParticipantCard";
import ParticipantCard from "@/app/_components/features/participants/ParticipantCard";
import { isVotableVote, type Participant } from "@/app/_types/types";

interface Props {
    participants: Participant[];
}

const ParticipantCardsGrid = ({ participants }: Props) => {
    const showVote = participants.every((it) => isVotableVote(it.vote));

    return (
        <div className="flex flex-wrap justify-center gap-3 p-4 content-start">
            {participants.map((participant) => (
                <ParticipantCard
                    key={participant.clientId}
                    name={participant.name}
                    vote={participant.vote}
                    showVote={showVote}
                />
            ))}
        </div>
    );
};

const DummyParticipantCardsGrid = () => (
    <div className="flex flex-wrap justify-center gap-3 p-4 content-start">
        <DummyParticipantCard />
        <DummyParticipantCard />
        <DummyParticipantCard />
    </div>
);

export { ParticipantCardsGrid, DummyParticipantCardsGrid };
