import type { CardInstance, Phase } from "../types";
import { CardView } from "./CardView";

export function HandTray({
  phase,
  hand,
  lanesFilled,
  onSelectCard,
  onConfirm,
  onReveal,
  onNext,
  isLastTurn,
}: {
  phase: Phase;
  hand: CardInstance[];
  lanesFilled: number;
  onSelectCard: (card: CardInstance) => void;
  onConfirm: () => void;
  onReveal: () => void;
  onNext: () => void;
  isLastTurn: boolean;
}) {
  return (
    <div className="bg-slate-950/60 border-t border-white/10 px-3 pt-2 pb-4 flex flex-col gap-2">
      {phase === "select" && (
        <>
          <div className="text-[11px] text-slate-400 text-center">
            手札から2枚選んでレーンに配置してください（{lanesFilled}/2）
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
            {hand.map((card) => (
              <CardView
                key={card.uid}
                card={card}
                size="sm"
                dimmed={lanesFilled >= 2}
                onClick={lanesFilled >= 2 ? undefined : () => onSelectCard(card)}
              />
            ))}
          </div>
          <button
            type="button"
            disabled={lanesFilled !== 2}
            onClick={onConfirm}
            className="mt-1 w-full py-2.5 rounded-lg font-bold text-sm bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white shadow active:scale-[0.98] transition"
          >
            決定
          </button>
        </>
      )}

      {phase === "locked" && (
        <button
          type="button"
          onClick={onReveal}
          className="w-full py-3 rounded-lg font-bold text-sm bg-amber-500 text-white shadow active:scale-[0.98] transition animate-pop-in"
        >
          カードオープン！
        </button>
      )}

      {phase === "reveal" && (
        <div className="text-center text-sm text-indigo-200 py-3">
          結果を判定中…
        </div>
      )}

      {phase === "resolved" && (
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3 rounded-lg font-bold text-sm bg-emerald-500 text-white shadow active:scale-[0.98] transition"
        >
          {isLastTurn ? "結果を見る" : "次のターンへ"}
        </button>
      )}
    </div>
  );
}
