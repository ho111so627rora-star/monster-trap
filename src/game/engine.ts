import type { CardInstance, LaneResult } from "../types";

export function resolveLane(
  lane: 0 | 1,
  playerCard: CardInstance,
  cpuCard: CardInstance,
): LaneResult {
  const base = { lane, playerCard, cpuCard };

  if (playerCard.category === "trap" && cpuCard.category === "monster") {
    return {
      ...base,
      outcome: "trap-captures-monster",
      playerPointsGained: cpuCard.power,
      cpuPointsGained: 0,
      playerCardDest: "graveyard",
      cpuCardDest: "player-trophy",
      message: `捕獲成功！ ${cpuCard.name}を捕らえた (+${cpuCard.power}pt)`,
    };
  }

  if (cpuCard.category === "trap" && playerCard.category === "monster") {
    return {
      ...base,
      outcome: "trap-captures-monster",
      playerPointsGained: 0,
      cpuPointsGained: playerCard.power,
      playerCardDest: "cpu-trophy",
      cpuCardDest: "graveyard",
      message: `被捕獲！ ${playerCard.name}が捕らえられた (-${playerCard.power}pt)`,
    };
  }

  if (playerCard.category === "trap" && cpuCard.category === "decoy") {
    return {
      ...base,
      outcome: "decoy-blocks-trap",
      playerPointsGained: 0,
      cpuPointsGained: 0,
      playerCardDest: "graveyard",
      cpuCardDest: "graveyard",
      message: "罠を読まれてガード！ 捕獲は0ptに終わった",
    };
  }

  if (cpuCard.category === "trap" && playerCard.category === "decoy") {
    return {
      ...base,
      outcome: "decoy-blocks-trap",
      playerPointsGained: 0,
      cpuPointsGained: 0,
      playerCardDest: "graveyard",
      cpuCardDest: "graveyard",
      message: "防衛成功！ 相手の罠を空振りさせた",
    };
  }

  if (playerCard.category === "trap" && cpuCard.category === "trap") {
    return {
      ...base,
      outcome: "trap-clash",
      playerPointsGained: 0,
      cpuPointsGained: 0,
      playerCardDest: "graveyard",
      cpuCardDest: "graveyard",
      message: "罠同士が衝突。何も起こらなかった",
    };
  }

  if (playerCard.category === "monster" && cpuCard.category === "monster") {
    return {
      ...base,
      outcome: "monster-clash",
      playerPointsGained: 0,
      cpuPointsGained: 0,
      playerCardDest: "graveyard",
      cpuCardDest: "graveyard",
      message: "すれ違い！ モンスター同士は不発に終わった",
    };
  }

  return {
    ...base,
    outcome: "decoy-fizzle",
    playerPointsGained: 0,
    cpuPointsGained: 0,
    playerCardDest: "graveyard",
    cpuCardDest: "graveyard",
    message: "不発。何も起こらなかった",
  };
}
