import type { CardInstance, LaneResult, Phase } from "../types";
import { CardBack, CardView } from "./CardView";

const LANE_ICON: Record<string, string> = {
  "trap-captures-monster": "🕸️",
  "decoy-blocks-trap": "🛡️",
  "monster-clash": "💥",
  "trap-clash": "⚡",
  "decoy-fizzle": "🌫️",
};

function LaneSlot({
  card,
  revealed,
  placeholder,
  onClick,
}: {
  card: CardInstance | null;
  revealed: boolean;
  placeholder: string;
  onClick?: () => void;
}) {
  if (!card) {
    return (
      <div className="w-20 h-28 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 text-[10px] text-center px-1">
        {placeholder}
      </div>
    );
  }
  if (!revealed) {
    return <CardBack size="md" />;
  }
  return <CardView card={card} size="md" onClick={onClick} showFlavor />;
}

export function Field({
  phase,
  playerLanes,
  cpuLanes,
  cpuHandCount,
  lastResults,
  onClearLane,
}: {
  phase: Phase;
  playerLanes: (CardInstance | null)[];
  cpuLanes: (CardInstance | null)[];
  cpuHandCount: number;
  lastResults: LaneResult[] | null;
  onClearLane: (lane: 0 | 1) => void;
}) {
  const revealed = phase === "reveal" || phase === "resolved";

  return (
    <div className="flex-1 flex flex-col justify-center gap-3 px-4 py-3">
      <div className="text-center text-[11px] text-slate-400">
        CPU残り手札: {cpuHandCount}枚
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[0, 1].map((lane) => (
          <div key={`cpu-${lane}`} className="flex justify-center">
            <LaneSlot
              card={cpuLanes[lane] ?? null}
              revealed={revealed && cpuLanes[lane] != null}
              placeholder="レーン待機"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[0, 1].map((lane) => {
          const result = lastResults?.[lane];
          return (
            <div
              key={`fx-${lane}`}
              className="h-10 flex flex-col items-center justify-center"
            >
              {phase === "resolved" && result ? (
                <div className="flex flex-col items-center animate-pop-in">
                  <span className="text-xl leading-none">
                    {LANE_ICON[result.outcome]}
                  </span>
                  {(result.playerPointsGained > 0 ||
                    result.cpuPointsGained > 0) && (
                    <span
                      className={`text-xs font-bold ${
                        result.playerPointsGained > 0
                          ? "text-emerald-300"
                          : "text-rose-300"
                      } animate-float-fade`}
                    >
                      {result.playerPointsGained > 0
                        ? `YOU +${result.playerPointsGained}`
                        : `CPU +${result.cpuPointsGained}`}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-indigo-400/50 text-lg">⇅</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[0, 1].map((lane) => (
          <div key={`player-${lane}`} className="flex justify-center">
            <LaneSlot
              card={playerLanes[lane] ?? null}
              revealed={true}
              placeholder={`レーン${lane + 1}に配置`}
              onClick={
                phase === "select" && playerLanes[lane]
                  ? () => onClearLane(lane as 0 | 1)
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
