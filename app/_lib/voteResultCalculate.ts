import { allCountableCards } from "@/app/_lib/variables";
import type { CountableVote, VoteResult } from "@/app/_types/types";

export const average = (votes: CountableVote[]) =>
    votes.reduce((accumulator: number, current) => accumulator + current, 0) /
        votes.length || "-";

/**
 * returns mode of votes. regardless of count of the mode, the result is returned as array
 * @param votes
 */
export const mode = (votes: CountableVote[]): string => {
    const groupedByCount = votes.reduce(
        (accumulator: { [key: string]: number }, current: CountableVote) => {
            accumulator[current] = (accumulator[current] || 0) + 1;
            return accumulator;
        },
        {} as { [key: string]: number },
    );
    const maxCount = Math.max(...Object.values(groupedByCount));
    const result = Object.keys(groupedByCount).filter(
        (key) => groupedByCount[key] === maxCount,
    );
    return result.length === 0 ? "-" : result.join(", ");
};

/**
 * decide result of the vote by using a logic which is commonly used among scrum teams.
 * @param votes
 */
export const scrumDecision = (votes: CountableVote[]): VoteResult => {
    const uniqueVotes: CountableVote[] = Array.from(new Set(votes)).sort(
        (a, b) => a - b,
    );
    const idx = uniqueVotes.map((v) => allCountableCards.indexOf(v));
    if (uniqueVotes.length === 1) return uniqueVotes[0];
    if (uniqueVotes.length > 3 || uniqueVotes.length < 2) return "discuss";
    if (idx.every((v, i, a) => !i || v === a[i - 1] + 1)) return uniqueVotes[1];
    return "discuss";
};
