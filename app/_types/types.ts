import { allCards, allCountableCards } from "@/app/_lib/variables";

export type CountableVote = 0.5 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100;
export type VotableVote = CountableVote | "skip"
export type Vote = CountableVote | "skip" | "not yet";
export type Participant = {
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
