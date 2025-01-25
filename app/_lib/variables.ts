import type { CountableVote, Vote } from "@/app/_types/types";

/**
 * an array containing all countable cards used when voting
 */
export const allCountableCards: CountableVote[] = [
    0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100,
];

/**
 * an array containing all cards used when voting
 */
export const allCards: Vote[] = [...allCountableCards, "skip"];
