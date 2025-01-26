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

export type ReactionType =
    | "like"
    | "love"
    | "dislike"
    | "laugh"
    | "question"
    | "bomb"
    | "tea";
export const reactionMap: {
    [key in ReactionType]: { emoji: string; label: string };
} = {
    like: { emoji: "👍", label: "like" },
    love: { emoji: "❤️", label: "love" },
    dislike: { emoji: "😤", label: "dislike" },
    laugh: { emoji: "😁", label: "laugh" },
    question: { emoji: "❓", label: "question" },
    bomb: { emoji: "🤯", label: "bomb" },
    tea: { emoji: "☕️", label: "tea" },
};

export const reactionKeys = Object.keys(reactionMap) as ReactionType[];

export type Reaction = {
    id: string;
    username: string;
    type: ReactionType;
};
