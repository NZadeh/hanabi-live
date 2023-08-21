import type { NumPlayers, NumSuits, Rank, SuitRankMap } from "@hanabi/data";
import type { DeepReadonly, Tuple } from "@hanabi/utils";
import type { CardState } from "./CardState";
import type { CardStatus } from "./CardStatus";
import type { StackDirection } from "./StackDirection";
import type { StateClue } from "./StateClue";
import type { StatsState } from "./StatsState";
import type { TurnState } from "./TurnState";

export interface GameState {
  readonly turn: TurnState;
  readonly log: readonly LogEntry[];
  readonly deck: readonly CardState[];
  readonly cardsRemainingInTheDeck: number;

  /**
   * Card statues are indexed by suit index and rank.
   *
   * This only depends on a card's identity, not the card itself, so it is stored here rather than
   * as a sub-property of `CardState`.
   */
  readonly cardStatus: DeepReadonly<SuitRankMap<CardStatus>>;

  readonly score: number;

  /** For "Throw It in a Hole" variants. */
  readonly numAttemptedCardsPlayed: number;

  readonly clueTokens: number;

  /** Should have a maximum length equal to `MAX_STRIKES`. */
  readonly strikes: readonly StateStrike[];

  /** Indexed by player index. Each player has an array of card orders. */
  readonly hands: Readonly<Tuple<readonly number[], NumPlayers>>;

  /** Indexed by suit index. Each suit has an array of card orders. */
  readonly playStacks: Readonly<Tuple<readonly number[], NumSuits>>;

  readonly playStackDirections: Readonly<Tuple<StackDirection, NumSuits>>;

  /**
   * For Sudoku variants, this denotes the first rank played of this stack. If the stack is not
   * started yet, then the value stored is null.
   */
  readonly playStackStarts: Readonly<Tuple<Rank | null, NumSuits>>;

  /**
   * For "Throw It in a Hole" variants. All played cards go into the hole. It contains card orders.
   */
  readonly hole: readonly number[];

  /** Suit index --> card order */
  readonly discardStacks: Readonly<Tuple<readonly number[], NumSuits>>;

  readonly clues: readonly StateClue[];
  readonly stats: StatsState;
}

export interface LogEntry {
  readonly turn: number;
  readonly text: string;
}

export interface StateStrike {
  readonly segment: number;
  readonly order: number;
}

export type PaceRisk = "LowRisk" | "MediumRisk" | "HighRisk" | "Zero" | "Null";
