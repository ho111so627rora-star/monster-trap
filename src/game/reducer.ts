import { buildDeck } from "../data/cards";
import { resolveLane } from "./engine";
import { chooseCpuPlay } from "./cpu";
import type { CardInstance, GameState } from "../types";

export type Action =
  | { type: "SELECT_CARD"; card: CardInstance }
  | { type: "CLEAR_LANE"; lane: 0 | 1 }
  | { type: "CONFIRM" }
  | { type: "REVEAL" }
  | { type: "RESOLVE" }
  | { type: "NEXT_TURN" }
  | { type: "RESTART" };

export function createInitialState(): GameState {
  return {
    turn: 1,
    phase: "select",
    playerHand: buildDeck("p"),
    cpuHand: buildDeck("c"),
    playerScore: 0,
    cpuScore: 0,
    playerTrophies: [],
    cpuTrophies: [],
    playerGraveyard: [],
    cpuGraveyard: [],
    playerLanes: [null, null],
    cpuLanes: [null, null],
    lastResults: null,
    playerPlayedHistory: [],
  };
}

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SELECT_CARD": {
      if (state.phase !== "select") return state;
      if (state.playerLanes.includes(action.card)) return state;
      const emptyIndex = state.playerLanes.findIndex((c) => c === null);
      if (emptyIndex === -1) return state;
      const playerLanes = [...state.playerLanes];
      playerLanes[emptyIndex] = action.card;
      return { ...state, playerLanes };
    }

    case "CLEAR_LANE": {
      if (state.phase !== "select") return state;
      const playerLanes = [...state.playerLanes];
      playerLanes[action.lane] = null;
      return { ...state, playerLanes };
    }

    case "CONFIRM": {
      if (state.phase !== "select") return state;
      if (state.playerLanes[0] == null || state.playerLanes[1] == null)
        return state;
      const [cpuA, cpuB] = chooseCpuPlay(
        state.cpuHand,
        state.playerHand,
        state.turn,
      );
      return {
        ...state,
        phase: "locked",
        cpuLanes: [cpuA, cpuB],
      };
    }

    case "REVEAL": {
      if (state.phase !== "locked") return state;
      return { ...state, phase: "reveal" };
    }

    case "RESOLVE": {
      if (state.phase !== "reveal") return state;
      const playerCard0 = state.playerLanes[0] as CardInstance;
      const playerCard1 = state.playerLanes[1] as CardInstance;
      const cpuCard0 = state.cpuLanes[0] as CardInstance;
      const cpuCard1 = state.cpuLanes[1] as CardInstance;

      const results = [
        resolveLane(0, playerCard0, cpuCard0),
        resolveLane(1, playerCard1, cpuCard1),
      ];

      let playerScore = state.playerScore;
      let cpuScore = state.cpuScore;
      const playerTrophies = [...state.playerTrophies];
      const cpuTrophies = [...state.cpuTrophies];
      const playerGraveyard = [...state.playerGraveyard];
      const cpuGraveyard = [...state.cpuGraveyard];

      for (const r of results) {
        playerScore += r.playerPointsGained;
        cpuScore += r.cpuPointsGained;

        if (r.playerCardDest === "graveyard") playerGraveyard.push(r.playerCard);
        else cpuTrophies.push(r.playerCard);

        if (r.cpuCardDest === "graveyard") cpuGraveyard.push(r.cpuCard);
        else playerTrophies.push(r.cpuCard);
      }

      const playedPlayerUids = new Set([playerCard0.uid, playerCard1.uid]);
      const playedCpuUids = new Set([cpuCard0.uid, cpuCard1.uid]);

      return {
        ...state,
        phase: "resolved",
        playerHand: state.playerHand.filter((c) => !playedPlayerUids.has(c.uid)),
        cpuHand: state.cpuHand.filter((c) => !playedCpuUids.has(c.uid)),
        playerScore,
        cpuScore,
        playerTrophies,
        cpuTrophies,
        playerGraveyard,
        cpuGraveyard,
        lastResults: results,
        playerPlayedHistory: [
          ...state.playerPlayedHistory,
          playerCard0,
          playerCard1,
        ],
      };
    }

    case "NEXT_TURN": {
      if (state.phase !== "resolved") return state;
      if (state.turn >= 5) {
        return { ...state, phase: "done" };
      }
      return {
        ...state,
        turn: state.turn + 1,
        phase: "select",
        playerLanes: [null, null],
        cpuLanes: [null, null],
        lastResults: null,
      };
    }

    case "RESTART":
      return createInitialState();

    default:
      return state;
  }
}
