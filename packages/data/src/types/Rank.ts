import { includes } from "@hanabi/utils";
import { DEFAULT_CARD_RANKS, START_CARD_RANK } from "../constants";

export type BasicRank = (typeof DEFAULT_CARD_RANKS)[number];

/**
 * The normal ranks of 1 through 5 and the rank of `START_CARD_RANK`.
 *
 * If this is updated, remember to also update the `isValidRank` function.
 */
export type Rank = BasicRank | typeof START_CARD_RANK;

export function isValidRank(rank: Rank): boolean {
  const potentialRank = rank as number;

  return (
    includes(DEFAULT_CARD_RANKS, potentialRank) ||
    potentialRank === START_CARD_RANK
  );
}
