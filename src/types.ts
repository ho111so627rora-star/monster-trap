export type CardCategory = "monster" | "decoy" | "trap";

export interface CardDef {
  defId: string;
  name: string;
  category: CardCategory;
  power: number;
  flavor: string;
  emoji: string;
  gradient: string;
  badgeClass: string;
}

export interface CardInstance extends CardDef {
  uid: string;
}

export type Owner = "player" | "cpu";

export type LaneOutcome =
  | "trap-captures-monster"
  | "decoy-blocks-trap"
  | "monster-clash"
  | "trap-clash"
  | "decoy-fizzle";

export interface LaneResult {
  lane: 0 | 1;
  playerCard: CardInstance;
  cpuCard: CardInstance;
  outcome: LaneOutcome;
  playerPointsGained: number;
  cpuPointsGained: number;
  playerCardDest: "graveyard" | "cpu-trophy";
  cpuCardDest: "graveyard" | "player-trophy";
  message: string;
}

export type Phase = "select" | "locked" | "reveal" | "resolved" | "done";

export interface GameState {
  turn: number;
  phase: Phase;
  playerHand: CardInstance[];
  cpuHand: CardInstance[];
  playerScore: number;
  cpuScore: number;
  playerTrophies: CardInstance[];
  cpuTrophies: CardInstance[];
  playerGraveyard: CardInstance[];
  cpuGraveyard: CardInstance[];
  playerLanes: (CardInstance | null)[];
  cpuLanes: (CardInstance | null)[];
  lastResults: LaneResult[] | null;
  playerPlayedHistory: CardInstance[];
}
