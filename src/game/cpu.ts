import type { CardInstance } from "../types";

function pickRandom<T>(arr: T[], count: number): T[] {
  const pool = [...arr];
  const picked: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

/**
 * Phase 1 CPU: mostly random, but leans on traps when the player still
 * holds high-value monsters (Lv.4/5), escalating as the match nears its end.
 */
export function chooseCpuPlay(
  cpuHand: CardInstance[],
  playerHand: CardInstance[],
  turn: number,
): [CardInstance, CardInstance] {
  const traps = cpuHand.filter((c) => c.category === "trap");
  const others = cpuHand.filter((c) => c.category !== "trap");

  const playerHasBigThreat = playerHand.some(
    (c) => c.category === "monster" && c.power >= 4,
  );

  const urgency = turn / 5;
  const trapBias = (playerHasBigThreat ? 0.55 : 0.2) + urgency * 0.3;

  let trapsToPlay = 0;
  for (let i = 0; i < Math.min(2, traps.length); i++) {
    if (Math.random() < trapBias) trapsToPlay++;
  }

  const chosenTraps = pickRandom(traps, trapsToPlay);
  const remainingSlots = 2 - chosenTraps.length;
  const chosenOthers = pickRandom(others, remainingSlots);

  const hand = [...chosenTraps, ...chosenOthers];
  while (hand.length < 2) {
    const leftovers = cpuHand.filter((c) => !hand.includes(c));
    if (leftovers.length === 0) break;
    hand.push(pickRandom(leftovers, 1)[0]);
  }

  const shuffled = pickRandom(hand, hand.length);
  return [shuffled[0], shuffled[1]];
}
