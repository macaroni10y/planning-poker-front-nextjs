"use client";

import { useMemo } from "react";
import { useWindowSize } from "react-use";
import DummyParticipantCard from "@/app/_components/features/participants/DummyParticipantCard";
import ParticipantCard from "@/app/_components/features/participants/ParticipantCard";
import { isVotableVote, type Participant } from "@/app/_types/types";

interface Props {
    participants: Participant[];
}

// Tailwind breakpoints (in px)
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

// Maximum grid columns per breakpoint
const MAX_COLS = {
    base: 5,
    sm: 6,
    md: 7,
    lg: 7,
    xl: 8,
};

const getMaxColsForWidth = (width: number): number => {
    if (width >= BREAKPOINTS.xl) return MAX_COLS.xl;
    if (width >= BREAKPOINTS.lg) return MAX_COLS.lg;
    if (width >= BREAKPOINTS.md) return MAX_COLS.md;
    if (width >= BREAKPOINTS.sm) return MAX_COLS.sm;
    return MAX_COLS.base;
};

const ParticipantCardsGrid = ({ participants }: Props) => {
    const { width } = useWindowSize();
    const showVote = participants.every((it) => isVotableVote(it.vote));
    const count = participants.length;

    const currentMaxCols = getMaxColsForWidth(width);
    const isSingleRow = count <= currentMaxCols;
    const cardSize = isSingleRow ? "large" : "normal";

    const gridStyle = useMemo(() => {
        const cols = {
            base: Math.min(count, MAX_COLS.base),
            sm: Math.min(count, MAX_COLS.sm),
            md: Math.min(count, MAX_COLS.md),
            lg: Math.min(count, MAX_COLS.lg),
            xl: Math.min(count, MAX_COLS.xl),
        };
        return {
            "--grid-cols-base": cols.base,
            "--grid-cols-sm": cols.sm,
            "--grid-cols-md": cols.md,
            "--grid-cols-lg": cols.lg,
            "--grid-cols-xl": cols.xl,
        } as React.CSSProperties;
    }, [count]);

    return (
        <div
            className="content-center h-full grid gap-3 justify-items-center w-fit mx-auto grid-cols-[repeat(var(--grid-cols-base),minmax(0,1fr))] sm:grid-cols-[repeat(var(--grid-cols-sm),minmax(0,1fr))] md:grid-cols-[repeat(var(--grid-cols-md),minmax(0,1fr))] lg:grid-cols-[repeat(var(--grid-cols-lg),minmax(0,1fr))] xl:grid-cols-[repeat(var(--grid-cols-xl),minmax(0,1fr))]"
            style={gridStyle}
        >
            {participants.map((participant, index) => (
                <ParticipantCard
                    key={participant.clientId}
                    name={participant.name}
                    vote={participant.vote}
                    showVote={showVote}
                    size={cardSize}
                    index={index}
                />
            ))}
        </div>
    );
};

const DummyParticipantCardsGrid = () => (
    <div className="content-center h-full grid grid-cols-3 gap-3 justify-items-center w-fit mx-auto">
        <DummyParticipantCard />
        <DummyParticipantCard />
        <DummyParticipantCard />
    </div>
);

export { ParticipantCardsGrid, DummyParticipantCardsGrid };
