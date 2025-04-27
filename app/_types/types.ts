import { allCards } from "@/app/_lib/variables";

export type CountableVote = 0.5 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100;
export type VotableVote = CountableVote | "skip";
export type Vote = CountableVote | "skip" | "not yet";
export type Participant = {
    clientId: string;
    name: string;
    vote: Vote;
};
export type VoteResult = CountableVote | "discuss";
// type guards
export const isCountableVote = (vote: Vote): vote is CountableVote =>
    typeof vote === "number";

export const isVotableVote = (vote: Vote): vote is VotableVote =>
    allCards.includes(vote);

export const isVote = (maybeVote: string | number): maybeVote is Vote => {
    const asNumber = Number(maybeVote);
    return allCards.some((card) => card === asNumber);
};

export type ReactionType = string;

export type Emoji = { emoji: string; label: string };

export const standardEmojis: Emoji[] = [
    { emoji: "👍", label: "like" },
    { emoji: "❤️", label: "love" },
    { emoji: "😤", label: "dislike" },
    { emoji: "😁", label: "laugh" },
    { emoji: "❓", label: "question" },
    { emoji: "🤯", label: "bomb" },
    { emoji: "☕️", label: "tea" },
];

export type Reaction = {
    id: string;
    username: string;
    x: number;
    y: number;
    type: ReactionType;
};
