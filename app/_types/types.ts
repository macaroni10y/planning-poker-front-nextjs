export type CountableVote = 0.5 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100;
export type Vote = CountableVote | "skip" | "not yet";
export type Participant = {
	name: string;
	vote: Vote;
};
export type VoteResult = CountableVote | "discuss";
// type guards
export const isCountableVote = (vote: Vote): vote is CountableVote =>
	typeof vote === "number";
