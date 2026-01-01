"use client";

import { useAtom } from "jotai";
import { LayoutGrid, LayoutList } from "lucide-react";
import DummyNameAndVote from "@/app/_components/features/participants/DummyNameAndVote";
import NameAndVote from "@/app/_components/features/participants/NameAndVote";
import {
    DummyParticipantCardsGrid,
    ParticipantCardsGrid,
} from "@/app/_components/features/participants/ParticipantCardsGrid";
import { Button } from "@/app/_components/ui/base/Button";
import { viewModeAtom } from "@/app/_lib/viewModeAtom";
import { isVotableVote, type Participant } from "@/app/_types/types";

interface Props {
    participants: Participant[];
}

const ListHeader = () => (
    <div className="justify-around items-center flex">
        <div className="p-2 font-bold flex justify-center items-center">
            name
        </div>
        <div className="p-2 font-bold flex justify-center items-center">
            vote
        </div>
    </div>
);

const NamesAndVotes = (props: Props) =>
    props.participants.map((participant) => (
        <NameAndVote
            key={participant.clientId}
            name={participant.name}
            showVote={props.participants.every((it) => {
                return isVotableVote(it.vote);
            })}
            vote={participant.vote}
        />
    ));

const DummyNamesAndVotes = () => (
    <>
        <DummyNameAndVote />
        <DummyNameAndVote />
        <DummyNameAndVote />
    </>
);

const ParticipantList = (props: Props) => {
    const [viewMode, setViewMode] = useAtom(viewModeAtom);

    return (
        <div className="flex justify-center w-full max-w-5xl h-1/2">
            <div className="rounded-xl w-full sm:w-11/12 xl:w-full bg-white flex flex-col">
                {/* Header with view toggle */}
                <div className="flex justify-between items-center px-4 py-2">
                    <span className="font-bold">Participants</span>
                    <div className="flex gap-1">
                        <Button
                            variant={
                                viewMode === "table" ? "secondary" : "ghost"
                            }
                            size="icon"
                            onClick={() => setViewMode("table")}
                            aria-label="Table view"
                        >
                            <LayoutList size={18} />
                        </Button>
                        <Button
                            variant={
                                viewMode === "cards" ? "secondary" : "ghost"
                            }
                            size="icon"
                            onClick={() => setViewMode("cards")}
                            aria-label="Card view"
                        >
                            <LayoutGrid size={18} />
                        </Button>
                    </div>
                </div>
                {/* Conditional view rendering */}
                <div className="overflow-y-auto max-h-full">
                    {props.participants.length !== 0 ? (
                        viewMode === "table" ? (
                            <>
                                <ListHeader />
                                <NamesAndVotes
                                    participants={props.participants}
                                />
                            </>
                        ) : (
                            <ParticipantCardsGrid
                                participants={props.participants}
                            />
                        )
                    ) : viewMode === "table" ? (
                        <>
                            <ListHeader />
                            <DummyNamesAndVotes />
                        </>
                    ) : (
                        <DummyParticipantCardsGrid />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParticipantList;
